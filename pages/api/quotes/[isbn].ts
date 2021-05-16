import firestore from 'lib/db/firestore'
import getHandler from 'lib/api/handler'
import { NextApiRequest, NextApiResponse } from 'next'
import verifyUid from 'lib/api/middleware/verify-uid'

const handler = getHandler()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { isbn } = req.query

  const docRef = firestore.collection('quotes').where('isbn', '==', isbn)

  docRef
    .get()
    .then((snapshots) => {
      const data = snapshots.docs.map((value) => ({
        id: value.id,
        ...value.data(),
      }))
      res.status(201).json(data)
    })
    .catch(() => {
      res.status(500).json({ error: 'database error' })
    })
})

handler.use(verifyUid)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { isbn, page, paragraph } = req.body

  const docRef = firestore.collection('quotes').doc()

  docRef
    .set({
      isbn,
      page,
      paragraph,
    })
    .then(() => {
      res.status(201).json({ message: 'saved sucessfully' })
    })
    .catch(() => {
      res.status(500).json({ error: 'database error' })
    })
})

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page, paragraph } = req.body
  const docRef = firestore.collection('quotes').doc(id)
  docRef
    .update({
      page,
      paragraph,
    })
    .then(() => {
      res.status(201).json({ message: 'edited successfully' })
    })
    .catch(() => {
      res.status(500).json({ error: 'database error' })
    })
})

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body
  const docRef = firestore.collection('quotes').doc(id)
  docRef
    .delete()
    .then(() => {
      res.status(201).json({ message: 'deleted successfully' })
    })
    .catch(() => {
      res.status(500).json({ error: 'database error' })
    })
})

export default handler
