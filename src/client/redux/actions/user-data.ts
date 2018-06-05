import { action, createAction } from 'typesafe-actions'
import { ApplicationState } from '../reducers'

import { APIUserData } from '../../../types/api'

export const GET_USER_DATA_START = 'GET_USER_DATA_START'
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_FAIL = 'GET_USER_DATA_FAIL'

export const HANDLE_USER_DATA = 'HANDLE_USER_DATA'

interface HandleUserDataOptions {
  noRetry?: boolean
}

const _handleUserData = (data: APIUserData) => action(HANDLE_USER_DATA, data)

export const handleUserData = (data: APIUserData, opts: HandleUserDataOptions = {}) => {
  return (dispatch, getState: () => ApplicationState) => {
    dispatch(_handleUserData(data))
  }
}

const _getUserDataStart = createAction(GET_USER_DATA_START)
const _getUserDataSuccess = createAction(GET_USER_DATA_SUCCESS)
const _getUserDataFail = (error: Error) => action(GET_USER_DATA_FAIL, error.stack)

export const getUserData = (onSuccess?: () => void, opts = {}) => {
  return async (dispatch, getState) => {
    dispatch(_getUserDataStart())

    const { userDataEndpoint } = getState().config

    try {
      const response = await window.fetch(userDataEndpoint, { credentials: 'same-origin' })

      if (response.status !== 200) {
        throw Error('Could not get user data')
      }

      const data = await response.json()

      dispatch(_getUserDataSuccess())
      dispatch(handleUserData(data, opts))
      onSuccess && onSuccess()
    } catch (err) {
      dispatch(_getUserDataFail(err))
    }
  }
}

export type UserDataAction = ReturnType<
  | typeof _handleUserData
  | typeof _getUserDataStart
  | typeof _getUserDataSuccess
  | typeof _getUserDataFail
>
