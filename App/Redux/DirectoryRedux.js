// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  directoryRequest: ['page'],
  directorySuccess: ['profiles'],
  directoryFailure: ['error'],
  directoryReset: null
})

export const DirectoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  profiles: [],
  error: null,
  lastPageFetched: 0, // Pages start at 1. This indicates no pages fetched.
  canLoadMore: true,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to fetch profiles
export const request = (state: Object, action: Object) => {
  const { page } = action;
  return state.merge({ fetching: true, lastPageFetched: page });
}

// we've successfully retrieved profiles
export const success = (state: Object, action: Object) => {
  const { profiles } = action;
  const allProfiles = state.profiles.concat(profiles)
  return state.merge({
    fetching: false, error: null, profiles: allProfiles,
    canLoadMore: profiles.length > 0
  })
}

// we're resetting the data with a RefreshControl event
export const reset = ( state: Object ) => {
  return state.merge({ profiles: [], lastPageFetched: 0, canLoadMore: true })
}

// we've had a problem with the request
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DIRECTORY_REQUEST]: request,
  [Types.DIRECTORY_SUCCESS]: success,
  [Types.DIRECTORY_FAILURE]: failure,
  [Types.DIRECTORY_RESET]: reset
})

/* ------------- Selectors ------------- */

export const directoryState = (state: Object) => state.directory
