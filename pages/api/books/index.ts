import getHandler from 'lib/api/handler'
import { verifyIdToken } from 'lib/db/admin'
import firestore from 'lib/db/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = getHandler()

handler.get(async (_: NextApiRequest, res: NextApiResponse) => {
  const colRef = firestore.collection('library')

  colRef.get().then((snapshot) => {
    const data = snapshot.docs.map((value) => ({
      id: value.id,
      ...value.data(),
    }))
    res.status(200).json(data)
  }).catch(() => {
    res.status(400).json({ error: 'database error' })
  })
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = await verifyIdToken(req.cookies.token)

  if (uid !== process.env.UID) {
    res.status(403).json({ error: 'forbidden' })
    return
  }

  const {
    isbn13,
  } = req.body

  const data = await fetch(
    `https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.ALADIN_KEY}&itemIdType=ISBN13&cover=big&ItemId=${isbn13}&output=JS&Version=20131101`,
  )

  if (!data.ok) {
    res.status(400).json({ error: 'database error' })
  }

  const { item } = await data.json()

  const {
    title, author, pubDate, publisher, cover, link,
  } = item[0]
  const { itemPage } = item[0].subInfo

  const docRef = firestore.collection('library').doc(isbn13)

  docRef
    .set({
      title,
      author,
      pubDate,
      publisher,
      cover,
      link,
      itemPage,
    })
    .then(() => {
      res.status(201).json({ message: 'Saved sucessfully' })
    })
    .catch(() => {
      res.status(400).json({ error: 'database error' })
    })
})

export default handler
