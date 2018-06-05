import * as express from 'express'

import { APIUserData } from '../../types/api'

require('dotenv-safe').config()

const SUPERADMINS = (process.env.SUPERADMINS || '').split(',')
const ADMINS = (process.env.ADMINS || '').split(',')

const isSuperAdmin = (email: string): boolean => {
  return SUPERADMINS.includes(email)
}

const isAdmin = (email: string): boolean => {
  return isSuperAdmin(email) || ADMINS.includes(email)
}

export const getUserData = (req: express.Request): APIUserData => {
  const reqUser = req.user || {}
  const email: string = ((reqUser.emails || [])[0] || {}).value

  return {
    id: reqUser.id,
    displayName: reqUser.displayName,
    email,
    isSuperAdmin: isSuperAdmin(email),
    isAdmin: isAdmin(email)
  }
}
