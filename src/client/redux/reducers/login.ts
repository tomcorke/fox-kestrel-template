import { Reducer } from 'redux'

import * as loginActions from '../actions/login'

export type LoginState = {
  authWindow?: Window | null
}

const initialState = {}

const LoginReducer: Reducer<LoginState, loginActions.LoginAction> = (state = initialState, action) => {
  switch (action.type) {
    case loginActions.LOGIN_START:
      return {
        ...state,
        authWindow: action.payload
      }
    case loginActions.CLOSE_AUTH_WINDOW:
      return {
        ...state,
        authWindow: null
      }
    default:
      return state
  }
}

export default LoginReducer
