import type { NextApiRequest, NextApiResponse } from 'next'

import multer from 'multer'
import storage from 'lib/db/storage'
import { format } from 'util'
import getHandler from 'lib/api/handler'

const handler = getHandler()

const bucket = storage.bucket('blog-ee4ab.appspot.com')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

handler.use(upload.single('file'))

handler.post((req: NextApiRequest & { file : any}, res: NextApiResponse) => {
  const { id } = req.body
  const file = bucket.file(id + req.file.mimetype.replace('image/', '.'))
  const stream = file.createWriteStream()
  stream.on('error', (error) => {
    res.status(500).json({ error: error.message })
  })

  stream.on('finish', () => {
    file.makePublic().then(() => {
      res.status(201).send(format(file.publicUrl()))
    })
  })
  stream.end(req.file.buffer)
})

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
