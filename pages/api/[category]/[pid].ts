import { verifyIdToken } from 'lib/db/admin'
import firestore, { getCollectionRefwithID } from 'lib/db/firestore'
import getHandler from 'lib/api/handler'
import { NextApiRequest, NextApiResponse } from 'next'
import { isValidatedCategory } from './index'

const handler = getHandler()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const pid = req.query.pid as string
  const { category } = req.query

  if (!isValidatedCategory(category)) {
    return res.status(404).json({
      error: 'not found',
    })
  }

  const colRef = firestore.collection(category as string)
  const autoIncrement = await colRef.doc('autoIncrement').get()
  const total = autoIncrement.data().value

  if (total === 0) {
    return res.status(404).json({ error: 'not found' })
  }

  const snapshot = await colRef.where('id', '==', total - parseInt(pid, 10) + 1).get()
  if (snapshot.empty) {
    return res.status(404).json({ error: 'not found' })
  }

  const doc = snapshot.docs[0]
  const { createdAt, subTitle, ...data } = doc.data()

  return res.status(200).json({
    ...data,
    total,
    doc: doc.id,
    subtitle: subTitle,
    createdAt: createdAt.toDate().toDateString(),
  })
})

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = await verifyIdToken(req.cookies.token)

  if (uid !== process.env.UID) {
    res.status(403).json({
      error: 'forbidden',
    })
    return
  }

  const { category } = req.query

  if (!isValidatedCategory(category)) {
    res.status(404).json({
      error: 'not found',
    })
    return
  }

  const {
    doc, title, subTitle, content,
  } = req.body

  const colRef = firestore.collection(category as string)
  await colRef.doc(doc).update({
    title,
    subTitle,
    content,
  })

  res.status(201).json({
    message: 'Edited sucessfully',
  })
})

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = await verifyIdToken(req.cookies.token)

  if (uid !== process.env.UID) {
    res.status(403).json({
      error: 'forbidden',
    })
    return
  }

  const { category } = req.query

  const { colRef, id } = await getCollectionRefwithID(category)

  const snapshot = await colRef.where('id', '==', id).get()

  if (snapshot.empty) {
    res.status(404).json({
      error: 'not found',
    })
    return
  }

  await colRef.doc(snapshot.docs[0].id).delete()

  const everySnapshot = await colRef.orderBy('id', 'asc').get()

  if (everySnapshot.empty === true) {
    res.status(200).json({
      message: 'Deleted Sucessfully',
    })
  }

  //   const { docs } = everySnapshot
  //   for (let i = 0; i < docs.length; i++) {
  //     const doc = colRef.docs(docs[i].id)
  //   }
  //   const response = firestore.runTransaction(async (t) => {
  //     t.getAll(firestore.collection(category))
  //   })
  //   return res.status(200).json({
  //     message: 'Deleted Sucessfully',
  //   })
})

export default handler
