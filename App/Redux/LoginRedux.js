// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['uid', 'client', 'accessToken', 'expiry'],
  loginFailure: ['error'],
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  accessToken: null,
  client: null,
  expiry: null,
  uid: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state: Object, { uid, client, accessToken, expiry }: Object) =>
  state.merge({ fetching: false, error: null, uid, client, accessToken, expiry })

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

// we've logged out
export const logout = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.accessToken !== null
