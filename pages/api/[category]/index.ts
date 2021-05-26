import firebase from 'firebase-admin'
import firestore, { getAutoIncrement, increaseAutoIncrement } from 'lib/db/firestore'
import getHandler from 'lib/api/handler'
import { NextApiRequest, NextApiResponse } from 'next'
import validateCategory from 'lib/api/middleware/validate-category'
import verifyUid from 'lib/api/middleware/verify-uid'

const handler = getHandler()

handler.use(validateCategory)

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { category } = req.query
  firestore
    .collection(category as string)
    .get()
    .then((snapshots) => snapshots.docs)
    .then((docs) => docs.map((doc) => {
      const { createdAt, ...data } = doc.data()
      return {
        ...data,
        doc: doc.id,
        createdAt: createdAt.toDate().toDateString(),
      }
    }))
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: error.message }))
})

handler.use(verifyUid)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { category } = req.query
  const { title, subtitle, content } = req.body

  const colRef = firestore.collection(category as string)
  const newId = await getAutoIncrement(colRef) + 1

  const processed = processContent(content)

  colRef
    .doc()
    .set({
      id: newId,
      title,
      subtitle,
      content: processed,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => increaseAutoIncrement(colRef))
    .then(() => res.status(201).json({ message: 'Saved sucessfully' }))
    .catch((error) => res.status(500).json({ error: error.message }))
})

export default handler

export function processContent(content: string) : string {
  const codeInjected = content.replace(/<pre>.*?<\/pre>/g, (substring) => {
    if (/<code>.*?<\/code>/g.test(content)) {
      return substring
    }
    return substring
      .replace('<pre>', '<pre><code>')
      .replace('</pre>', '</code></pre>')
  })
  return codeInjected
    .replace(/font-size([^"]+)[rem|px];/g, '')
}
