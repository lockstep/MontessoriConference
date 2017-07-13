import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import RegisterActions from '../Redux/RegisterRedux'
import ErrorActions from '../Redux/ErrorRedux'
import _ from 'lodash'

// attempts to register
export function * register (api, { user }) {
  const { email, password, confirmation, firstName, lastName, position, organization, city, state, country, optedInToPublicDirectory } = user
  if (email === '' || password === '' || email === undefined || password === undefined) {
    let type = 'CLIENT_ERROR';
    let message = "Username or password can't be blank.";

    yield put(RegisterActions.registerFailure())
    yield put(ErrorActions.errorOccur(type, message))
  } else if (password != confirmation) {
    let type = 'CLIENT_ERROR';
    let message = "Password does not match.";

    yield put(RegisterActions.registerFailure())
    yield put(ErrorActions.errorOccur(type, message))
  } else if (firstName === '' || firstName === undefined) {
    let type = 'CLIENT_ERROR';
    let message = "First name can't be blank";

    yield put(RegisterActions.registerFailure())
    yield put(ErrorActions.errorOccur(type, message))
  } else if (lastName === '' || lastName === undefined) {
    let type = 'CLIENT_ERROR';
    let message = "Last name can't be blank";

    yield put(RegisterActions.registerFailure())
    yield put(ErrorActions.errorOccur(type, message))
  } else if (organization === '' || organization === undefined) {
    let type = 'CLIENT_ERROR';
    let message = "Organization can't be blank";

    yield put(RegisterActions.registerFailure())
    yield put(ErrorActions.errorOccur(type, message))
  } else if (city === '' || city === undefined) {
    let type = 'CLIENT_ERROR';
    let message = "City can't be blank";

    yield put(RegisterActions.registerFailure())
    yield put(ErrorActions.errorOccur(type, message))
  } else if (state === '' || state === undefined) {
    let type = 'CLIENT_ERROR';
    let message = "State can't be blank";

    yield put(RegisterActions.registerFailure())
    yield put(ErrorActions.errorOccur(type, message))
  } else if (country === '' || country === undefined) {
    let type = 'CLIENT_ERROR';
    let message = "Country can't be blank";

    yield put(RegisterActions.registerFailure())
    yield put(ErrorActions.errorOccur(type, message))
  } else if (optedInToPublicDirectory !== true) {
    let type = 'CLIENT_ERROR';
    let message = "Please allow your profile to be listed in The Montessori Directory"

    yield put(RegisterActions.registerFailure())
    yield put(ErrorActions.errorOccur(type, message))
  } else {
    const response = yield call(api.register, email, password, confirmation, firstName, lastName, position, organization, city, state, country, optedInToPublicDirectory)

    if (response.ok) {
      console.log(response)
      response = yield call(api.login, email, password)
      if (response.ok) {
        const { id } = response.data.user
        const { uid, client, expiry } = response.headers
        const accessToken = response.headers['access-token']
        yield put(LoginActions.loginSuccess(id, uid, client, accessToken, expiry))
        yield put(RegisterActions.registerSuccess())
        yield put(ErrorActions.clearError())
      }
    }

    if (!response.ok) {
      let type = response.problem;
      let message = '';
      if (type == "NETWORK_ERROR") {
        message = 'Network errors'
      } else {
        console.log(response);
        let errorMessage = [];
        if (response.data) {
          for (var key in response.data.meta.errors) {
            errorMessage.push(`${key} ${response.data.meta.errors[key]}`)
          }
        }
        message = errorMessage.join(', ')
      }

      yield put(RegisterActions.registerFailure())
      yield put(ErrorActions.errorOccur(type, message))
    }
  }
}

