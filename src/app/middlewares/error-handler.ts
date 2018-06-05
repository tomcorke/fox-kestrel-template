import * as express from 'express'

export const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(`ERROR: ${req.url}`)
  console.error(err.stack)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).send()
}
