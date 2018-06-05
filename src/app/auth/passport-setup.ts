import * as passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import * as express from 'express'
import * as session from 'express-session'

import { ensureLoggedIn } from '../middlewares/auth'
import { getUserData } from '../services/user'
import { APIUserData } from '../../types/api'

type PassportCallback = (err: any, data: any) => any

require('dotenv-safe').config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || ''

const APP_BASE_URL = process.env.APP_BASE_URL || ''
const APP_SESSION_SECRET = process.env.APP_SESSION_SECRET || 'fox-kestrel'

export const passportInit = (app: express.Application) => {
  passport.use(
    new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: ['email']
    },
    (accessToken: string, refreshToken: string, profile: any, callback: PassportCallback) => {
      return callback(null, profile)
    }
  ))

  passport.serializeUser((user: any, callback: PassportCallback) => {
    callback(null, user)
  })

  passport.deserializeUser((obj: any, callback: PassportCallback) => {
    callback(null, obj)
  })

  app.use(session({
    secret: APP_SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/auth/', passport.authenticate('google'))
  app.get('/auth/r', passport.authenticate('google', { failureRedirect: `${APP_BASE_URL}/auth/failure` }),
    (req, res) => {
      res.redirect(`${APP_BASE_URL}/auth/success`)
    }
  )
  app.get('/auth/failure', (req, res) => res.render('login-failure'))
  app.get('/auth/success', ensureLoggedIn, async (req, res) => {
    return res.render('login-success', {
      userData: JSON.stringify(await getUserData(req))
    })
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect(APP_BASE_URL)
  })

  app.get('/getUserData', ensureLoggedIn, (req, res) => {
    res.json(getUserData(req))
  })
}
