// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createConferencePhotoRequest: ['imagePath'],
  createConferencePhotoSuccess: null,
  createConferencePhotoFailure: 'error',
  sendCommentWithImageRequest: ['breakoutSessionId', 'imagePath'],
  sendCommentWithImageSuccess: null,
  sendCommentWitnImageFailure: 'error'
})

export const PhotoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  uploading: false
})

/* ------------- Reducers ------------- */

export const upload = (state: Object, action: Object) => state.merge({ uploading: true })

export const success = (state: Object, action: Object) => {
  return state.merge({
    uploading: false
  })
}

export const failure = (state: Object, action: Object) => {
  return state.merge({
    uploading: false
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_CONFERENCE_PHOTO_REQUEST]: upload,
  [Types.CREATE_CONFERENCE_PHOTO_SUCCESS]: success,
  [Types.CREATE_CONFERENCE_PHOTO_FAILURE]: failure,
  [Types.SEND_COMMENT_WITH_IMAGE_REQUEST]: upload,
  [Types.SEND_COMMENT_WITH_IMAGE_SUCCESS]: success,
  [Types.SEND_COMMENT_WITH_IMAGE_FAILURE]: failure
})

/* ------------- Selectors ------------- */

export const photoState = (state: Object) => state.photo
