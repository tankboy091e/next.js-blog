import getHandler from 'lib/api/handler'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = getHandler()

handler.get(async (_: NextApiRequest, res: NextApiResponse) => {
  await fetch(
    'https://www.google.com/ping?sitemap=https://www.ohjinsu.com/sitemap.xml',
  )
  res.status(200).json({ meesage: 'hello' })
})

export default handler
