import firestore from 'lib/db/firestore'
import getHandler from 'lib/api/handler'
import { NextApiRequest, NextApiResponse } from 'next'
import { writingCategories } from 'lib/util/category'

const handler = getHandler()

handler.get(async (_: NextApiRequest, res: NextApiResponse) => {
  const promises = writingCategories.map((value) => {
    const limit = value === 'essais' ? 6 : 3
    return firestore.collection(value)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get()
  })

  const responses = await Promise.all(promises)

  const posts = responses.map((response) => response.docs.map((doc) => {
    const { title, createdAt } = doc.data()
    return {
      title,
      doc: doc.id,
      createdAt: createdAt.toDate().toDateString(),
    }
  }))

  const aboutResponse = await firestore.collection('user').doc('about').get()

  const about = aboutResponse.data()

  const bookResponse = await firestore.collection('library').orderBy('createdAt', 'desc').limit(5).get()

  const getBookValue = (value: any) => ({
    id: value.id,
    cover: value.data().cover,
    itemPage: value.data().itemPage,
  })

  let books = bookResponse.docs.map(getBookValue)

  if (books.length < 5) {
    books = (await firestore.collection('library').limit(5).get()).docs.map(getBookValue)
  }

  res.status(200).json({
    about,
    posts,
    books,
  })
})

export default handler
