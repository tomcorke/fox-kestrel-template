import commonConfig from './common'

const config = {
  ...commonConfig,

  // ...require('./mockData').default,

  userDataEndpoint: 'https://localhost:3443/getUserData',
  authEndpoint: 'https://localhost:3443/auth'
}

export default config
