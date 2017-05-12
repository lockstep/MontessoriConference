import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    search: require('./SearchRedux').reducer,
    directory: require('./DirectoryRedux').reducer,
    profile: require('./ProfileRedux').reducer,
    privateMessage: require('./PrivateMessageRedux').reducer,
    breakoutSessionList: require('./BreakoutSessionListRedux').reducer,
    breakoutSession: require('./BreakoutSessionRedux').reducer,
    commentList: require('./CommentListRedux').reducer,
    conferencePhotos: require('./ConferencePhotosRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
