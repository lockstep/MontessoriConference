import { call, put } from 'redux-saga/effects'
import PrivateMessageActions from '../Redux/PrivateMessageRedux'

// attempts to login
export function * sendMessage (api, { profileId, message }) {
  console.log('SAGA: sending message', profileId, message);
  if (message === '') {

  } else {
    // sending message
    const response = yield call(api.sendMessage, profileId, message);
    console.log(response);
    if (response.ok) {
      yield put(PrivateMessageActions.getMessages(profileId));
    } else {
      yield put(PrivateMessageActions.sendMessageFailure());
    }
  }
  // if (password === '') {
  //   // dispatch failure
  //   yield put(LoginActions.loginFailure('WRONG'))
  // } else {
  //   const response = yield call(api.login, email, password)

  //   if (response.ok) {
  //     const { uid, client, expiry } = response.headers
  //     const accessToken = response.headers['access-token']
  //     yield put(LoginActions.loginSuccess(uid, client, accessToken, expiry))
  //   } else {
  //     yield put(LoginActions.loginFailure('error'))
  //   }
  //   // dispatch successful logins
  //   // yield put(LoginActions.loginSuccess(email))
  // }
}

export function * getMessages (api, { profileId }) {
  console.log('SAGA: getMessages', profileId);
  const response = yield call(api.getMessages, profileId);
  if (response.ok) {
    yield put(PrivateMessageActions.getMessagesSuccess(response.data.private_messages));
  } else {

  }
}

// export function * loginSuccess (api, { uid, client, accessToken, expiry }) {
//   yield call(api.saveCredentials, accessToken, uid, client, expiry);
// }
