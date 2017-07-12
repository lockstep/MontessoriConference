// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import find from 'lodash/find'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  myProfileRequest: ['profileId'],
  myProfileUpdateRequest: ['profileId', 'profile']
})

export const MyProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  updating: null
})

/* ------------- Reducers ------------- */

// we're attempting to fetch profile
export const request = (state: Object) => state.merge({ fetching: true })
export const updateRequest = (state: Object) => state.merge({ updating: true })

/* ------------- Hookup Reducers To Types ------------- */

  export const reducer = createReducer(INITIAL_STATE, {
    [Types.MY_PROFILE_REQUEST]: request,
    [Types.MY_PROFILE_UPDATE_REQUEST]: updateRequest
  })

/* ------------- Selectors ------------- */

export const myProfileState = (state: Object) => state.myProfile
