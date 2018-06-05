import * as path from 'path'
import * as express from 'express'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as handlebars from 'express-handlebars'

import { passportInit } from './auth/passport-setup'

import { logRequest } from './middlewares/log-request'
import { errorHandler } from './middlewares/error-handler'

require('dotenv-safe').config()

const APP_BASE_URL = process.env.APP_BASE_URL || ''

const app = express()

app.use(logRequest)
app.use(express.json())
app.use(cookieParser())
app.use(compression())

app.engine('.hbs', handlebars({ extname: '.hbs' }))
app.set('views', path.join(__dirname, '../../src/app/views'))
app.set('view engine', '.hbs')

passportInit(app)

app.get('/*', express.static(path.join(__dirname, '../client')))

app.use(errorHandler)

const PORT = 3100
app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`)
})
