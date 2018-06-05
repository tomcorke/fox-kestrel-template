import * as Express from 'express'
import { getUserData } from '../services/user'

const isAuthenticated = (req: Express.Request) => {
  return req.isAuthenticated && req.isAuthenticated()
}

export const ensureLoggedIn = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  if (!isAuthenticated(req)) {
    console.warn(`Unauthenticated request to ${req.path}`)
    throw Error(`Unauthenticated request to ${req.path}`)
  }
  next()
}

export const ensureLoggedInWithRedirect = (path: string) => (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  if (!isAuthenticated(req)) {
    console.warn(`Unauthenticated request to ${req.path}`)
    return res.redirect(path)
  }
  next()
}
