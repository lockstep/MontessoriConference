import { put, select } from 'redux-saga/effects'
import { is } from 'ramda'

// exported to make available for tests
export const selectLogin = (state) => {
  console.log(state);
  return state.login;
}

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
  }
  const {uid, client, accessToken, expiry} = yield select(selectLogin)
  console.log('try to recover log in info')
  if (accessToken != null) {
    console.log('yes!')
    yield put(LoginActions.loginSuccess(uid, client, accessToken, expiry));
  }
}
