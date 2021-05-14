import firebase from 'firebase-admin'
import firestore from 'lib/db/firestore'
import getHandler from 'lib/api/handler'
import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next'
import { isValidatedCategory } from '../../[category]/index'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
})

const handler = getHandler()

handler.use(upload.any())

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = await getPostID(req, res)
  const result = await firestore
    .collection('comments')
    .where('belongsTo', '==', postId)
    .get()

  if (result.empty) {
    res.status(200).json([])
    return
  }

  res.status(200).json(
    result.docs.map((value) => {
      const { name, content, createdAt } = value.data()
      return {
        id: value.id,
        name,
        content,
        createdAt: createdAt?.toDate().toDateString(),
      }
    }),
  )
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = await getPostID(req, res)
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
  const { doc, password } = req.body
  const docRef = firestore.collection('comments').doc(doc)

  const docResult = await docRef.get()

  if (!docResult.exists) {
    res.status(404).json({
      message: 'Not Found.',
    })
    return
  }

  if (docResult.data().password !== password) {
    res.status(403).json({
      message: 'Invaid Password',
    })
    return
  }

  await docRef.delete()

  res.status(201).json({
    message: 'Deleted Sucessfully',
  })
})

async function getPostID(req: NextApiRequest, res: NextApiResponse) {
  const { category, id } = req.query
  if (!isValidatedCategory(category)) {
    return res.status(404).json({
      message: 'not Found',
    })
  }

  const docsColRef = firestore.collection(category as string)
  const docsAutoIncrement = await docsColRef.doc('autoIncrement').get()
  const docsTotal = docsAutoIncrement.data().value as number

  if (docsTotal === 0) {
    return res.status(404).json({
      message: 'no docs',
    })
  }

  const snapshot = await docsColRef
    .where('id', '==', docsTotal - parseInt(id as string, 10) + 1)
    .get()

  if (snapshot.empty) {
    return res.status(404).json({
      message: 'no docs',
    })
  }

  return snapshot.docs[0].id
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
