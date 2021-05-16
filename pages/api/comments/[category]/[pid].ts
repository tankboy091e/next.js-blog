import firebase from 'firebase-admin'
import firestore, { getAutoIncrement } from 'lib/db/firestore'
import getHandler from 'lib/api/handler'
import { NextApiRequest, NextApiResponse } from 'next'
import validateCategory from 'lib/api/middleware/validate-category'

const handler = getHandler()

handler.use(validateCategory)

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { category, pid } = req.query

  const postId = await getPostID(category as string, pid as string)

  await firestore
    .collection('comments')
    .where('belongsTo', '==', postId)
    .get()
    .then((snapshots) => {
      const data = snapshots.docs.map((value) => {
        const { name, content, createdAt } = value.data()
        return {
          id: value.id,
          name,
          content,
          createdAt: createdAt?.toDate().toDateString(),
        }
      })
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(500).json({ error: 'database ereror' })
    })
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { category, pid } = req.query

  const postId = await getPostID(category as string, pid as string)
  const docRef = firestore.collection('comments').doc()

  docRef
    .set({
      ...req.body,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      belongsTo: postId,
    })
    .then(() => {
      res.status(201).json({
        message: 'Saved Sucessfully',
      })
    })
    .catch(() => {
      res.status(500).json({
        error: 'Database error',
      })
    })
})

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { doc, content } = req.body
  const docRef = firestore.collection('comments').doc(doc)

  docRef
    .update({
      content,
    })
    .then(() => {
      res.status(201).json({
        message: 'Edited Sucessfully',
      })
    })
    .catch(() => {
      res.status(500).json({
        error: 'Database error',
      })
    })
})

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, password } = req.body
  const docRef = firestore.collection('comments').doc(id)
  const docResult = await docRef.get()

  if (!docResult.exists) {
    res.status(404).json({
      error: 'comment not Found',
    })
    return
  }

  if (docResult.data().password !== password) {
    res.status(401).json({
      error: 'invaid Password',
    })
    return
  }

  docRef
    .delete()
    .then(() => {
      res.status(201).json({
        message: 'resource deleted Sucessfully',
      })
    })
    .catch(() => {
      res.status(500).json({
        error: 'database error',
      })
    })
})

async function getPostID(category: string, pid: string) {
  const colRef = firestore.collection(category as string)
  const autoIncrement = await getAutoIncrement(colRef)

  return autoIncrement - parseInt(pid as string, 10) + 1
}

export default handler