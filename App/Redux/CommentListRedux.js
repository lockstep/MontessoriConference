// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { directoryState } from './DirectoryRedux'
import find from 'lodash/find'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendComment: ['breakoutSessionId', 'comment'],
  sendCommentFailure: null,
  getComments: ['breakoutSessionId'],
  getCommentsSuccess: ['comments']
})

export const CommentListTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  comments: []
})

/* ------------- Reducers ------------- */

// we're attempting to send message
export const create = (state: Object) => state.merge({ fetching: true });
export const fail = (state: Object) => state.merge({ fetching: false });
export const request = (state: Object) => state.merge({ comments: [] });
export const requestSuccess = (state: Object, {comments}: Object) => {
  return state.merge({
    fetching: false,
    comments
  })
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_COMMENT]: create,
  [Types.SEND_COMMENT_FAILURE]: fail,
  [Types.GET_COMMENTS]: request,
  [Types.GET_COMMENTS_SUCCESS]: requestSuccess
})

/* ------------- Selectors ------------- */

export const commentListState = (state: Object) => state.commentList
