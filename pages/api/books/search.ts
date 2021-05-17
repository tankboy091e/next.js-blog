import getHandler from 'lib/api/handler'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = getHandler()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { value } = req.query

  const request = fetch(
    `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${process.env.ALADIN_KEY}&Query=${encodeURI(value as string)}&MaxResults=10&start=1&cover=big&output=JS&Version=20131101`,
  )

  request
    .then((response) => response.json())
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(500).json({ error: 'database error' }))
})

export default handler
