import getHandler from 'lib/api/handler'
import firestore from 'lib/db/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = getHandler()

handler.get(async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { isbn } = query
  firestore.collection('library')
    .doc(isbn as string)
    .get()
    .then((doc) => ({ ...doc.data() }))
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(400).json({ error: 'database error' }))
})

export default handler
