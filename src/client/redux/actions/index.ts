import * as loginActions from './login'
import * as siteActions from './site'
import * as userDataActions from './user-data'

const actions = {
  login: loginActions,
  site: siteActions,
  userData: userDataActions
}

export type ApplicationAction =
  | loginActions.LoginAction
  | siteActions.SiteAction
  | userDataActions.UserDataAction

export default actions
