import firestore from 'lib/db/firestore'
import getHandler from 'lib/api/handler'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = getHandler()

handler.post(async (req :NextApiRequest, res: NextApiResponse) => {
  const { id, password } = req.body

  const docRef = await firestore.collection('comments').doc(id).get()

  if (docRef.exists === false) {
    return res.status(404).json({ error: 'no docs.' })
  }

  const result = docRef.data().password

  if (result !== password) {
    return res.status(403).json({ error: 'Invalid password.' })
  }

  return res.status(200).json({ message: 'Validated.' })
})

export default handler
