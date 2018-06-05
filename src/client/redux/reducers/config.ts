import { Reducer } from 'redux'

const config = require(`../../config/${process.env.NODE_ENV}`).default

export type ConfigState = {
  userDataEndpoint: string,
  authEndpoint: string
}

const initialState: ConfigState = config

const ConfigReducer: Reducer<ConfigState> = (state = initialState) => {
  return state
}

export default ConfigReducer
