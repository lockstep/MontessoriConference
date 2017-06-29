// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  breakoutSessionListRequest: null,
  breakoutSessionListSuccess: ['breakoutSessionList'],
  breakoutSessionListFailure: ['error'],
  breakoutSessionListReset: ['searchParams']
})

export const BreakoutSessionListTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  breakoutSessionList: [],
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to fetch breakout sessions
export const request = (state: Object, action: Object) => {
  return state.merge({ fetching: true });
}

// we've successfully retrieved breakout sessions
export const success = (state: Object, action: Object) => {
  const { breakoutSessionList } = action;
  return state.merge({
    fetching: false, error: null, breakoutSessionList
  })
}

// we're resetting the data with a RefreshControl event
export const reset = ( state: Object ) => {
  return state.merge({ breakoutSessionList: [], lastPageFetched: 0, canLoadMore: false })
}

// we've had a problem with the request
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BREAKOUT_SESSION_LIST_REQUEST]: request,
  [Types.BREAKOUT_SESSION_LIST_SUCCESS]: success,
  [Types.BREAKOUT_SESSION_LIST_FAILURE]: failure,
  [Types.BREAKOUT_SESSION_LIST_RESET]: reset
})

/* ------------- Selectors ------------- */

export const breakoutSessionListState = (state: Object) => state.breakoutSessionList
