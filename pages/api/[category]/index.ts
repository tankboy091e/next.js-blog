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
    .then((docs) => docs.filter((doc) => doc.data().title))
    .then((data) => data.sort((a, b) => {
      const { createdAt: createdA } = a.data()
      const { createdAt: createdB } = b.data()
      if (createdA > createdB) return -1
      if (createdA < createdB) return 1
      return 0
    }))
    .then((docs) => docs.map((doc) => {
      const { createdAt, title } = doc.data()
      return {
        title,
        doc: doc.id,
        createdAt: createdAt?.toDate().toDateString(),
      }
    }))
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: error.message }))
})

handler.use(verifyUid)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { category } = req.query
  const {
    title, subtitle, content, footnote,
  } = req.body

  const colRef = firestore.collection(category as string)
  const newId = await getAutoIncrement(colRef) + 1

  const processedContent = processContent(content)
  const processedFootnote = processFootnote(footnote)
  colRef
    .doc()
    .set({
      id: newId,
      title,
      subtitle,
      footnote: processedFootnote,
      content: processedContent,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => increaseAutoIncrement(colRef))
    .then(() => res.status(201).json({ message: 'Saved sucessfully' }))
    .catch((error) => res.status(500).json({ error: error.message }))
})

export default handler

export function processFootnote(footnote: string) : string {
  return footnote
}

export function processContent(content: string) : string {
  const codeInjected = content.replace(/<pre>.*?<\/pre>/g, (substring) => {
    if (/<code>.*?<\/code>/g.test(content)) {
      return substring
    }
    return substring
      .replace('<pre>', '<pre><code>')
      .replace('</pre>', '</code></pre>')
  })
  const result = codeInjected.replace(/<span style="vertical-align: super;.*?<\/span>/g, (substring) => substring
    .replace(/<span.*?">/, '<sup>')
    .replace('</span>', '</sup>'))
  return result
    .replace(/font-size([^"]+)[rem|px];/g, '')
}
