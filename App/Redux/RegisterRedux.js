// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerRequest: ['email', 'password', 'confirmation'],
  registerSuccess: ['id', 'uid', 'client', 'accessToken', 'expiry'],
  registerFailure: ['error']
})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state: Object, { id, uid, client, accessToken, expiry }: Object) =>
  state.merge({ fetching: false, error: null })

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const registerState = (state: Object) => state.register
