// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { directoryState } from './DirectoryRedux'
import find from 'lodash/find'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  profileRequest: ['profileId', 'profiles'],
})

export const ProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  name: null,
  position: null,
  location: null,
  bio: null,
  profileImageUrl: null,
})

/* ------------- Reducers ------------- */

// we're attempting to fetch profiles
export const request = (state: Object, action: Object) => {
  const { profileId, profiles } = action;
  const profile = find(profiles, { 'id': profileId })
  return state.merge(Object.assign({}, profile));
}

/* ------------- Hookup Reducers To Types ------------- */

  export const reducer = createReducer(INITIAL_STATE, {
    [Types.PROFILE_REQUEST]: request,
  })

/* ------------- Selectors ------------- */

export const profileState = (state: Object) => state.profile
