import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, { email, password }) {
  if (password === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    const response = yield call(api.login, email, password)

    if (response.ok) {
      const { uid, client, expiry } = response.headers
      const { id } = response.data.user
      const accessToken = response.headers['access-token']
      yield put(LoginActions.loginSuccess(id, uid, client, accessToken, expiry))
    } else {
      console.log('Login failure')
      yield put(LoginActions.loginFailure('error'))
    }
    // dispatch successful logins
    // yield put(LoginActions.loginSuccess(email))
  }
}

export function * loginSuccess (api, { id, uid, client, accessToken, expiry }) {
  yield call(api.saveCredentials, id, uid, client, accessToken, expiry);
}

export function * logOut (api) {
  yield call(api.logOut);
}
