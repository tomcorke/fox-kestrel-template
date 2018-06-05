import { action } from 'typesafe-actions'

import { PageType } from '../../constants'

export const CHANGE_PAGE = 'CHANGE_PAGE'
export const SET_MOUSE_MOVED = 'SET_MOUSE_MOVED'

export const changePage = (page: PageType) => action(
  CHANGE_PAGE,
  page
)

const _setMouseMoved = (hasMoved: boolean) => action(
  SET_MOUSE_MOVED,
  hasMoved
)

const mouseMoveTime = 1000
let mouseMoveTimeout: number

const mouseMoveDebounceTime = 500
let mouseMoveDebounceTimeout: number | undefined
let mouseMoveDebounced = false

const _doMouseMove = (dispatch) => {
  if (mouseMoveTimeout) {
    window.clearTimeout(mouseMoveTimeout)
  }

  dispatch(_setMouseMoved(true))

  mouseMoveTimeout = window.setTimeout(() => dispatch(_setMouseMoved(false)), mouseMoveTime)
}

export const mouseMove = () => {
  return (dispatch) => {
    if (mouseMoveDebounced) {
      return
    }

    mouseMoveDebounced = true

    if (!mouseMoveDebounceTimeout) {
      mouseMoveDebounceTimeout = window.setTimeout(() => {
        mouseMoveDebounceTimeout = undefined
        mouseMoveDebounced = false
        _doMouseMove(dispatch)
      }, mouseMoveDebounceTime)
    }

    _doMouseMove(dispatch)
  }
}

export type SiteAction = ReturnType<
  | typeof changePage
  | typeof _setMouseMoved
>
