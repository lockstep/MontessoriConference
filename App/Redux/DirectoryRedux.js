// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  directoryRequest: ['page'],
  directorySuccess: ['profiles'],
  directoryFailure: ['error']
})

export const DirectoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  profiles: [],
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to fetch profiles
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully retrieved profiles
export const success = (state: Object, action: Object) => {
  const allProfiles = state.profiles.concat(action.profiles)
  state.merge({ fetching: false, error: null, profiles: allProfiles })
}

// we've had a problem with the request
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DIRECTORY_REQUEST]: request,
  [Types.DIRECTORY_SUCCESS]: success,
  [Types.DIRECTORY_FAILURE]: failure
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
