declare module 'passport-google-oauth20' {
  import { Strategy as PassportStrategy } from 'passport'
  export class Strategy extends PassportStrategy {
    constructor (
      strategyOptions: {
        clientID: string,
        clientSecret: string,
        callbackURL: string,
        scope: string[]
      },
      handler: (
        accessToken: string,
        refreshToken: string,
        profile: object,
        callback: (err: any, data: any) => void
      ) => void
    )
  }
}
