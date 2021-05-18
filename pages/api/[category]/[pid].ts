import firestore, { decreaseAutoIncrement, getAutoIncrement, reorderCollection } from 'lib/db/firestore'
import getHandler from 'lib/api/handler'
import { NextApiRequest, NextApiResponse } from 'next'
import validateCategory from 'lib/api/middleware/validate-category'
import verifyUid from 'lib/api/middleware/verify-uid'
import storage from 'lib/db/storage'
import { processContent } from '.'

const handler = getHandler()

handler.use(validateCategory)

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { category, pid } = req.query

  const colRef = firestore.collection(category as string)
  const total = await getAutoIncrement(colRef)

  if (total === 0) {
    res.status(404).json({ error: 'no docs' })
    return
  }

  const id = getDocumentId(total, pid as string)

  colRef
    .where('id', '==', id)
    .get()
    .then((snapshots) => {
      if (snapshots.empty) {
        throw new Error('resource not found')
      }
      return snapshots.docs[0]
    })
    .then((doc) => {
      const { createdAt, ...data } = doc.data()
      return {
        total,
        ...data,
        doc: doc.id,
        createdAt: createdAt.toDate().toDateString(),
      }
    })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({
      error: error.message,
    }))
})

handler.use(verifyUid)

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { category } = req.query

  const {
    doc, title, subtitle, content,
  } = req.body

  const processed = processContent(content)

  await firestore
    .collection(category as string)
    .doc(doc)
    .update({
      title,
      subtitle,
      content: processed,
    })
    .then(() => res.status(201).json({
      message: 'resource edited sucessfully',
    }))
    .catch((error) => res.status(500).json({
      error: error.message,
    }))
})

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { category, pid } = req.query

  const colRef = firestore.collection(category as string)
  const total = await getAutoIncrement(colRef)

  const id = getDocumentId(total, pid as string)

  const snapshots = await colRef.where('id', '==', id).get()

  if (snapshots.empty) {
    res.status(404).json({ error: 'resrouce not found' })
    return
  }

  const doc = snapshots.docs[0]

  const { content } = doc.data()

  let processError: string

  const imageUrls = (content as string)
    .match(/img src="([^"]+)"/g)
    ?.map((value) => value
      .replace('img src=', '')
      .replace(/"/g, '')
      .replace(`https://storage.googleapis.com/${storage.name}/`, ''))

  const imagePromises = imageUrls?.map((fileName) => storage.file(fileName).delete())

  await Promise.all(imagePromises)
    .catch((error) => {
      processError += error
    })

  const commentsPromises : Promise<any>[] = []

  const commentSnapshots = await firestore
    .collection('comments')
    .where('belongsTo', '==', id)
    .get()

  commentSnapshots.forEach((doc) => {
    commentsPromises.push(doc.ref.delete())
  })

  await Promise.all(commentsPromises)
    .catch((error) => {
      processError += error
    })

  doc.ref
    .delete()
    .then(() => decreaseAutoIncrement(colRef))
    .then(() => reorderCollection(colRef))
    .then(() => res.status(200).json({
      message: 'resource deleted successfully',
    }))
    .catch(() => res.status(500).json({
      error: `database error. ${processError}`,
    }))
})

export default handler

function getDocumentId(total: number, pid: string): number {
  return total - parseInt(pid, 10) + 1
}
