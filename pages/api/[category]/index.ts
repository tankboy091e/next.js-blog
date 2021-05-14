import firebase from 'firebase-admin'
import firestore, { getCollectionRefwithID } from 'lib/db/firestore'
import { verifyIdToken } from 'lib/db/admin'
import getHandler from 'lib/api/handler'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = getHandler()

export function isValidatedCategory(category: string | string[]) {
  return ['sum', 'essais', 'dev'].includes(category as string)
}

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { category } = req.query

  if (!isValidatedCategory(category)) {
    return res.status(404).json({ error: 'not found' })
  }

  const colRef = firestore.collection(category as string)
  const autoIncrement = await colRef.doc('autoIncrement').get()

  const total = autoIncrement.data().value as number

  return res.status(200).json({
    total,
  })
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { category } = req.query

  const { uid } = await verifyIdToken(req.cookies.token)

  if (uid !== process.env.UID) {
    res.status(403).json({ error: 'forbidden' })
    return
  }

  if (!isValidatedCategory(category)) {
    res.status(404).json({ error: 'not found' })
    return
  }

  const { title, subTitle, content } = req.body
  const { colRef, id } = await getCollectionRefwithID(category)

  await colRef.doc().set({
    id,
    title,
    subTitle,
    content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
  res.status(201).json({ message: 'Saved sucessfully' })
})

export default handler
