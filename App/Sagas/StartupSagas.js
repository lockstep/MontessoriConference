import { put, select } from 'redux-saga/effects'
import { is } from 'ramda'

// exported to make available for tests
export const selectLogin = (state) => state.login

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
  }
  const {uid, client, accessToken, expiry} = yield select(selectLogin)
  if (accessToken != null) {
    yield call(api.saveCredentials, uid, client, accessToken, expiry);
  }
}
