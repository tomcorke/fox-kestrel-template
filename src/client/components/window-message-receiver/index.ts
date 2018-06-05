import { connect } from 'react-redux'
import actions from '../../redux/actions'
import { ApplicationState } from '../../redux/reducers'

import WindowMessageReceiver from './window-message-receiver'

const ConnectedWindowMessageReceiver = connect(
  (state: ApplicationState) => ({
    authWindow: state.login.authWindow
  }),
  dispatch => ({
    closeAuthWindow: () => dispatch(actions.login.closeAuthWindow()),
    handleUserData: (data) => dispatch(actions.userData.handleUserData(data))
  })
)(WindowMessageReceiver)

export default ConnectedWindowMessageReceiver
