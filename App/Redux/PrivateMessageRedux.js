// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { directoryState } from './DirectoryRedux'
import find from 'lodash/find'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendMessage: ['profileId', 'message'],
  getMessages: ['profileId'],
  getMessagesSuccess: ['messages']
})

export const PrivateMessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  messages: []
})

/* ------------- Reducers ------------- */

// we're attempting to send message
export const sendMessage = (state: Object) => state.merge({ fetching: true })
export const getMessagesSuccess = (state: Object, {messages}: Object) => {
  console.log('get message success');
  return state.merge({
    fetching: false,
    messages
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_MESSAGE]: sendMessage,
  [Types.GET_MESSAGES_SUCCESS]: getMessagesSuccess
})

/* ------------- Selectors ------------- */

export const privateMessageState = (state: Object) => state.privateMessage
