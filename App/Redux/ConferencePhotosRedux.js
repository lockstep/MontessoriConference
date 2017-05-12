// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  conferencePhotosRequest: ['page'],
  conferencePhotosSuccess: ['conferencePhotos'],
  conferencePhotosFailure: ['error'],
  conferencePhotosReset: null,
  createConferencePhotoRequest: ['imagePath']
})

export const ConferencePhotosTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  conferencePhotos: [],
  error: null,
  lastPageFetched: 0, // Pages start at 1. This indicates no pages fetched.
  canLoadMore: true,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to fetch breakout sessions
export const request = (state: Object, action: Object) => {
  const { page } = action;
  return state.merge({ fetching: true, lastPageFetched: page});
}

// we've successfully retrieved breakout sessions
export const success = (state: Object, action: Object) => {
  console.log('success', state, action);
  const { conferencePhotos } = action;
  const allPhotos = state.conferencePhotos.concat(conferencePhotos)
  return state.merge({
    fetching: false, error: null, conferencePhotos: allPhotos,
    canLoadMore: conferencePhotos.length > 0
  })
}

// we're resetting the data with a RefreshControl event
export const reset = (state: Object) => {
  return state.merge({conferencePhotos: [], lastPageFetched: 0, canLoadMore: false})
}

// we've had a problem with the request
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONFERENCE_PHOTOS_REQUEST]: request,
  [Types.CONFERENCE_PHOTOS_SUCCESS]: success,
  [Types.CONFERENCE_PHOTOS_FAILURE]: failure,
  [Types.CONFERENCE_PHOTOS_RESET]: reset
})

/* ------------- Selectors ------------- */

export const conferencePhotosState = (state: Object) => state.conferencePhotos
