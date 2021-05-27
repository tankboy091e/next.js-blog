import getHandler from 'lib/api/handler'
import firestore from 'lib/db/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = getHandler()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { value, from } = req.query
  if (from === 'library') {
    firestore
      .collection('library')
      .get()
      .then((snapshots) => snapshots.docs.find((doc) => doc.data().title?.includes(value)))
      .then((doc) => {
        if (!doc) {
          throw new Error('no result')
        }
        return doc.data()
      })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ error: error.message }))
    return
  }
  const request = fetch(
    `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${process.env.ALADIN_KEY}&Query=${encodeURI(value as string)}&MaxResults=10&start=1&cover=big&output=JS&Version=20131101`,
  )

  request
    .then((response) => response.json())
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(500).json({ error: 'database error' }))
})

export default handler
