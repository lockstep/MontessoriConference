// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    temperature: require('./TemperatureRedux').reducer,
    login: require('./LoginRedux').reducer,
    search: require('./SearchRedux').reducer,
    directory: require('./DirectoryRedux').reducer,
    profile: require('./ProfileRedux').reducer,
    privateMessage: require('./PrivateMessageRedux').reducer,
    breakoutSessionList: require('./BreakoutSessionListRedux').reducer,
    breakoutSession: require('./BreakoutSessionRedux').reducer,
    commentList: require('./CommentListRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
