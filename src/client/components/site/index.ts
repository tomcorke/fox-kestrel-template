import { connect } from 'react-redux'
import * as siteActions from '../../redux/actions/site'
import { ApplicationState } from '../../redux/reducers'

import Site from './site'

const ConnectedSite = connect(
  (state: ApplicationState) => ({
    page: state.site.page
  })
)(Site)

export default ConnectedSite
