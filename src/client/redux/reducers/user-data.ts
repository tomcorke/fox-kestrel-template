import { Reducer } from 'redux'

import { APIUserData } from '../../../types/api'
import config from '../../config'
import * as userDataActions from '../actions/user-data'

export type UserDataState = {
  isGettingUserData?: boolean
  id?: number,
  displayName?: string
  isLoggedIn: boolean
  isAdmin: boolean
  isSuperAdmin: boolean
}

const filterByGuild = (guild, realm) => char =>
  char.guild === guild &&
  char.realm === realm

const setGettingData = (state: UserDataState, isGettingData: boolean): UserDataState => {
  return {
    ...state,
    isGettingUserData: isGettingData
  }
}

const handleUserData = (state: UserDataState, userData: APIUserData): UserDataState => {
  const {
    id,
    displayName,
    isAdmin,
    isSuperAdmin
  } = userData

  const isLoggedIn = !!id

  return {
    ...setGettingData(state, false),
    id,
    displayName,
    isLoggedIn,
    isAdmin,
    isSuperAdmin
  }
}

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  isSuperAdmin: false
}

const UserDataReducer: Reducer<UserDataState, userDataActions.UserDataAction> = (state = initialState, action) => {
  switch (action.type) {
    case userDataActions.GET_USER_DATA_START:
      return setGettingData(state, true)
    case userDataActions.GET_USER_DATA_FAIL:
      return setGettingData(state, false)
    case userDataActions.GET_USER_DATA_SUCCESS:
      return setGettingData(state, false)
    case userDataActions.HANDLE_USER_DATA:
      return handleUserData(state, action.payload)
    default:
      return state
  }
}

export default UserDataReducer
