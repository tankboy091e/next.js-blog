import firebase from 'firebase-admin'
import firestore from 'lib/db/firestore'
import getHandler from 'lib/api/handler'
import { NextApiRequest, NextApiResponse } from 'next'
import { isValidatedCategory } from '../../[category]/index'

const handler = getHandler()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = await getPostID(req, res)
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
  const postId = await getPostID(req, res)
  const docRef = firestore.collection('comments').doc()
  console.log(req.body)
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
      res.status(400).json({
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
      res.status(400).json({
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
      error: 'Not Found',
    })
    return
  }

  if (docResult.data().password !== password) {
    res.status(403).json({
      error: 'Invaid Password',
    })
    return
  }

  docRef
    .delete()
    .then(() => {
      res.status(201).json({
        message: 'Deleted Sucessfully',
      })
    })
    .catch(() => {
      res.status(500).json({
        error: 'database error',
      })
    })
})

async function getPostID(req: NextApiRequest, res: NextApiResponse) {
  const { category, id } = req.query
  if (!isValidatedCategory(category)) {
    return res.status(404).json({
      error: 'not Found',
    })
  }

  const docsColRef = firestore.collection(category as string)
  const docsAutoIncrement = await docsColRef.doc('autoIncrement').get()
  const docsTotal = docsAutoIncrement.data().value as number

  if (docsTotal === 0) {
    return res.status(404).json({
      error: 'no docs',
    })
  }

  const snapshot = await docsColRef
    .where('id', '==', docsTotal - parseInt(id as string, 10) + 1)
    .get()

  if (snapshot.empty) {
    return res.status(404).json({
      error: 'no docs',
    })
  }

  return snapshot.docs[0].id
}

export default handler
