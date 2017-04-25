// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { directoryState } from './DirectoryRedux'
import find from 'lodash/find'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  breakoutSessionRequest: ['breakoutSessionId', 'breakoutSessionList']
})

export const BreakoutSessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  name: '',
  description: '',
  start_time: '',
  end_time: '',
  organizers: [],
})

/* ------------- Reducers ------------- */

// we're attempting to fetch profiles
export const request = (state: Object, action: Object) => {
  const { breakoutSessionId, breakoutSessionList } = action;
  const breakoutSession = find(breakoutSessionList, { 'id': breakoutSessionId })
  return state.merge(Object.assign({}, breakoutSession));
}

/* ------------- Hookup Reducers To Types ------------- */

  export const reducer = createReducer(INITIAL_STATE, {
    [Types.BREAKOUT_SESSION_REQUEST]: request
  })

/* ------------- Selectors ------------- */

export const breakoutSessionState = (state: Object) => state.breakoutSession
