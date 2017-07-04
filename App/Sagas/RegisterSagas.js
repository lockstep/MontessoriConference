import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import RegisterActions from '../Redux/RegisterRedux'
import ErrorActions from '../Redux/ErrorRedux'

// attempts to register
export function * register (api, { email, password, confirmation }) {
  console.log('register', email, password, confirmation)
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
  } else {
    const response = yield call(api.register, email, password, confirmation)

    if (response.ok) {
      console.log(response)
      yield put(RegisterActions.registerSuccess())
      yield put(LoginActions.loginRequest(email, password))
      yield put(ErrorActions.clearError())
    } else {
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

