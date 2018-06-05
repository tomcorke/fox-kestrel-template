import { Reducer } from 'redux'
import * as siteActions from '../actions/site'
import { PAGES, PAGE_HOME, PageType } from '../../constants'

export interface SiteState {
  page: PageType
  mouseMoved: boolean
}

const isPageType = (page: string): page is PageType => {
  return (PAGES as string[]).includes(page)
}

const getInitialPage = (): PageType => {
  const hashPage = (window.location.hash || '').substr(1)
  if (isPageType(hashPage)) {
    return hashPage
  }
  return PAGE_HOME
}

const initialState: SiteState = {
  page: getInitialPage(),
  mouseMoved: false
}

const changePage = (state: SiteState, page: string) => {
  return {
    ...state,
    page: page as PageType
  }
}

const mouseMoved = (state: SiteState, hasMoved: boolean) => {
  return {
    ...state,
    mouseMoved: hasMoved
  }
}

const SiteReducer: Reducer<SiteState, siteActions.SiteAction> = (state = initialState, action) => {
  switch (action.type) {
    case siteActions.CHANGE_PAGE:
      return changePage(state, action.payload)
    case siteActions.SET_MOUSE_MOVED:
      return mouseMoved(state, action.payload)
    default:
      return state
  }
}

export default SiteReducer
