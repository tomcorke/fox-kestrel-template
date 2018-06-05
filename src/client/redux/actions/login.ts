import { action, createAction } from 'typesafe-actions'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const CLOSE_AUTH_WINDOW = 'CLOSE_AUTH_WINDOW'

const popupWindow = (url: string, window: Window, w: number, h: number): Window | null => {
  const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2)
  const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2)
  return window.open(url, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, ' +
    `scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`)
}

const _loginStart = (authWindow: Window) => action(
  LOGIN_START,
  authWindow
)

export const login = (window: Window) => {
  return (dispatch, getState) => {
    const { authEndpoint } = getState().config
    const authWindow = popupWindow(authEndpoint, window, 450, 600)

    if (authWindow !== null) {
      dispatch(_loginStart(authWindow))
    } else {
      throw Error('Could not open login window')
    }
  }
}

const _closeAuthWindow = createAction(CLOSE_AUTH_WINDOW)

export const closeAuthWindow = () => {
  return (dispatch, getState) => {
    const { authWindow } = getState().login
    if (authWindow) {
      authWindow.close()
    }
    dispatch(_closeAuthWindow())
  }
}

export type LoginAction = ReturnType<
  | typeof _loginStart
  | typeof _closeAuthWindow
>
