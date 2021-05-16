import firebase from 'firebase-admin'
import firestore, { getAutoIncrement, increaseAutoIncrement } from 'lib/db/firestore'
import getHandler from 'lib/api/handler'
import { NextApiRequest, NextApiResponse } from 'next'
import validateCategory from 'lib/api/middleware/validate-category'
import verifyUid from 'lib/api/middleware/verify-uid'

const handler = getHandler()

handler.use(validateCategory)

handler.use(verifyUid)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { category } = req.query
  const { title, subtitle, content } = req.body

  const colRef = firestore.collection(category as string)
  const newId = await getAutoIncrement(colRef) + 1

  colRef
    .doc()
    .set({
      id: newId,
      title,
      subtitle,
      content,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      increaseAutoIncrement(colRef)
    })
    .then(() => {
      res.status(201).json({ message: 'Saved sucessfully' })
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
    })
})

export default handler
