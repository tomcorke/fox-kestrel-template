import { connect } from 'react-redux'
import { login } from '../../redux/actions/login'
import { ApplicationState } from '../../redux/reducers'

import HomePage from './home-page'

const ConnectedHomePage = connect(
  (state: ApplicationState) => ({
    isLoggedIn: state.userData.isLoggedIn,
    displayName: state.userData.displayName
  }),
  (dispatch) => ({
    onLoginClick: () => dispatch(login(window))
  })
)(HomePage)

export default ConnectedHomePage
