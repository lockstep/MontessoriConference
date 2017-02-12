import { call, put } from 'redux-saga/effects'
import TmcApi from '../Services/TmcApi'
import DirectoryActions from '../Redux/DirectoryRedux'

export function * getProfiles (action) {
  const api = TmcApi.create()
  const { page } = action
  // make the call to the api
  const response = yield call(api.getProfiles, page)

  if (response.ok) {
    yield put(DirectoryActions.directorySuccess(response.data.profiles))
  } else {
    yield put(DirectoryActions.directoryFailure())
  }
}

export function * resetProfiles (action) {
  yield put(DirectoryActions.directoryRequest(1))
}
