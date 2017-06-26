import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  errorOccur: ['errorType', 'message'],
  clearError: null
})

export const ErrorTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  errorType: null,
  message: null,
  show: false
})

/* ------------- Reducers ------------- */

export const errorOccur = (state, {errorType, message}) => state.merge({ errorType, message, show: true })

export const clearError = (state) => state.merge({errorType: 'NO_ERROR', message: '', show: false})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ERROR_OCCUR]: errorOccur,
  [Types.CLEAR_ERROR]: clearError
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isError = (errorState) => errorState.message !== null
