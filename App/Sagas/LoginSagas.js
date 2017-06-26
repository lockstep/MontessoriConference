import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import ErrorActions from '../Redux/ErrorRedux'

// attempts to login
export function * login (api, { email, password }) {
  if (email === '' || password === '' || email === undefined || password === undefined) {
    let type = 'CLIENT_ERROR';
    let message = "Username or password can't be blank.";

    yield put(LoginActions.loginFailure())
    yield put(ErrorActions.errorOccur(type, message))
  } else {
    const response = yield call(api.login, email, password)

    if (response.ok) {
      const { uid, client, expiry } = response.headers
      const accessToken = response.headers['access-token']
      yield put(LoginActions.loginSuccess(uid, client, accessToken, expiry))
      yield put(ErrorActions.clearError())
    } else {
      let type = response.problem;
      let message = '';
      if (type == "CLIENT_ERROR") {
        message = 'Username or password is invalid.'
      } else {
        message = 'Network errors'
      }

      yield put(LoginActions.loginFailure())
      yield put(ErrorActions.errorOccur(type, message))
    }
  }
}

export function * loginSuccess (api, { id, uid, client, accessToken, expiry }) {
  yield call(api.saveCredentials, id, uid, client, accessToken, expiry);
}

export function * logOut (api) {
  yield call(api.logOut);
}
