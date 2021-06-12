import { verifyIdToken } from 'lib/db/admin'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }
  const token = req.headers.authorization.replace('Bearer ', '')
  verifyIdToken(token).then(({ uid }) => {
    if (uid === process.env.UID) {
      next()
    } else {
      res.status(403).json({ error: 'forbidden' })
    }
  }).catch((error) => {
    res.status(401).json({ error: error.message })
  })
}
