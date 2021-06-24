import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const { category } = req.query
  if (isValidatedCategory(category)) {
    next()
    return
  }
  res.status(404).json({
    error: 'category not Found',
  })
}

function isValidatedCategory(category: string | string[]) {
  return ['sum', 'essais', 'dev', 'gallary'].includes(category as string)
}
