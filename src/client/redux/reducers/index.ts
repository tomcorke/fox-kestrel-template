import { combineReducers, Reducer } from 'redux'
import ConfigReducer, { ConfigState } from './config'
import LoginReducer, { LoginState } from './login'
import SiteReducer, { SiteState } from './site'
import UserDataReducer, { UserDataState } from './user-data'
import { ApplicationAction } from '../actions'

export type ApplicationState = {
  config: ConfigState
  login: LoginState
  site: SiteState
  userData: UserDataState
}

const rootReducer: Reducer<ApplicationState, ApplicationAction> =
  combineReducers<ApplicationState, ApplicationAction>({
    config: ConfigReducer,
    login: LoginReducer,
    site: SiteReducer,
    userData: UserDataReducer
  })

export default rootReducer
