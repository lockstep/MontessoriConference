import { takeLatest } from 'redux-saga/effects'
import TmcApi from '../Services/TmcApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { DirectoryTypes } from '../Redux/DirectoryRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
import { PrivateMessageTypes } from '../Redux/PrivateMessageRedux'
import { BreakoutSessionListTypes } from '../Redux/BreakoutSessionListRedux'
import { CommentListTypes } from '../Redux/CommentListRedux'
import { ConferencePhotosTypes } from '../Redux/ConferencePhotosRedux'
import { PhotoTypes } from '../Redux/PhotoRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, loginSuccess } from './LoginSagas'
import { register } from './RegisterSagas'
import { getProfiles, resetProfiles } from './DirectorySagas'
import { openScreen } from './OpenScreenSagas'
import { sendMessage, getMessages } from './PrivateMessageSagas'
import { getBreakoutSessionList } from './BreakoutSessionListSagas'
import { sendComment, sendCommentWithImage, getComments } from './CommentListSagas'
import { getConferencePhotos, resetConferencePhotos, createConferencePhoto } from './ConferencePhotosSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : TmcApi.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGIN_SUCCESS, loginSuccess, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),

    takeLatest(DirectoryTypes.DIRECTORY_REQUEST, getProfiles),
    takeLatest(DirectoryTypes.DIRECTORY_RESET, resetProfiles),

    takeLatest(PrivateMessageTypes.SEND_MESSAGE, sendMessage, api),
    takeLatest(PrivateMessageTypes.GET_MESSAGES, getMessages, api),

    takeLatest(BreakoutSessionListTypes.BREAKOUT_SESSION_LIST_REQUEST, getBreakoutSessionList, api),

    takeLatest(CommentListTypes.SEND_COMMENT, sendComment, api),
    takeLatest(PhotoTypes.SEND_COMMENT_WITH_IMAGE_REQUEST, sendCommentWithImage, api),
    takeLatest(CommentListTypes.GET_COMMENTS, getComments, api),

    takeLatest(ConferencePhotosTypes.CONFERENCE_PHOTOS_REQUEST, getConferencePhotos, api),
    takeLatest(ConferencePhotosTypes.CONFERENCE_PHOTOS_RESET, resetConferencePhotos),
    takeLatest(PhotoTypes.CREATE_CONFERENCE_PHOTO_REQUEST, createConferencePhoto, api),

  ]
}
