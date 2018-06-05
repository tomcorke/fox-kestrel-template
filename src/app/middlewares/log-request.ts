import * as Express from 'express'

export const logRequest = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  console.log(`${req.method} ${req.path}`)
  next()
}
