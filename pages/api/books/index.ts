import getHandler from 'lib/api/handler'
import verifyUid from 'lib/api/middleware/verify-uid'
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

handler.use(verifyUid)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    isbn,
  } = req.body

  const idType = isbn.length < 13 ? 'isbn' : 'isbn13'

  const bookData = await fetch(
    `https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.ALADIN_KEY}&itemIdType=${idType}&cover=big&ItemId=${isbn}&output=JS&Version=20131101`,
  )

  if (!bookData.ok) {
    res.status(500).json({ error: 'database error' })
    return
  }

  const data = await bookData.json()

  if (data.errorCode) {
    res.status(500).json({ error: data.errorMessage })
    return
  }

  const { item } = data

  const {
    title, author, pubDate, publisher, cover, link,
  } = item[0]

  const { itemPage } = item[0].subInfo

  firestore.collection('library')
    .doc(isbn)
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
      res.status(500).json({ error: 'database error' })
    })
})

export default handler
