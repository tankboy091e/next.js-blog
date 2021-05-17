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

  const postSnapshots = await firestore
    .collection(category as string)
    .where('id', '==', postId)
    .get()

  if (postSnapshots.empty) {
    res.status(500).json({ error: 'database error' })
    return
  }

  const { id } = postSnapshots.docs[0]

  firestore
    .collection('comments')
    .where('doc', '==', id)
    .get()
    .then((snapshots) => snapshots.docs.sort((a, b) => {
      const { createdAt: timestampA } = a.data()
      const { createdAt: timestampB } = b.data()
      if (timestampA > timestampB) return 1
      if (timestampA < timestampB) return -1
      return 0
    }))
    .then((docs) => docs.map((value) => {
      const { name, content, createdAt } = value.data()
      return {
        id: value.id,
        name,
        content,
        createdAt: createdAt?.toDate().toDateString(),
      }
    }))
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(500).json({ error: 'database ereror' }))
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const docRef = firestore.collection('comments').doc()
  const data = req.body
  docRef
    .set({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => res.status(201).json({ message: 'resource saved sucessfully' }))
    .catch(() => res.status(500).json({ error: 'database error' }))
})

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, content } = req.body
  const docRef = firestore.collection('comments').doc(id)

  docRef
    .update({
      content,
    })
    .then(() => res.status(201).json({ message: 'resource edited sucessfully' }))
    .catch(() => res.status(500).json({ error: 'database error' }))
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
    .then(() => res.status(201).json({ message: 'resource deleted sucessfully' }))
    .catch(() => res.status(500).json({ error: 'database error' }))
})

async function getPostID(category: string, pid: string) {
  const colRef = firestore.collection(category as string)
  const autoIncrement = await getAutoIncrement(colRef)

  return autoIncrement - parseInt(pid as string, 10) + 1
}

export default handler
