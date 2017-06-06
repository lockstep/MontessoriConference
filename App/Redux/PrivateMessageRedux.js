// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { directoryState } from './DirectoryRedux'
import find from 'lodash/find'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendMessage: ['profileId', 'message'],
  getMessages: ['profileId'],
  getMessagesSuccess: ['messages'],
  sendMessageFailure: []
})

export const PrivateMessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  messages: [],
  error: null
})

/* ------------- Reducers ------------- */

// we're attempting to send message
export const createMessage = (state: Object) => state.merge({ error: false, fetching: true });
export const requestMessages = (state: Object) => state.merge({ error: false, messages: [] });
export const requestMessagesSuccess = (state: Object, {messages}: Object) => {
  return state.merge({
    fetching: false,
    messages,
    error: false
  })
};
export const createMessageFailure = (state: Object) => {
  return state.merge({
    fetching: false,
    error: 'This user has disabled private messages.'
  })
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_MESSAGE]: createMessage,
  [Types.GET_MESSAGES]: requestMessages,
  [Types.GET_MESSAGES_SUCCESS]: requestMessagesSuccess,
  [Types.SEND_MESSAGE_FAILURE]: createMessageFailure
})

/* ------------- Selectors ------------- */

export const privateMessageState = (state: Object) => state.privateMessage
