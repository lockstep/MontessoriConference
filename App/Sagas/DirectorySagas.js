import { call, put } from 'redux-saga/effects'
import TmcApi from '../Services/TmcApi'
import DirectoryActions from '../Redux/DirectoryRedux'

export function * getProfiles (action) {
  const api = TmcApi.create()
  const { page, searchParams } = action
  // make the call to the api
  const response = yield call(api.getProfiles, page, searchParams)

  console.log('calling get profiles')
  if (response.ok) {
    console.log('get directory success')
    yield put(DirectoryActions.directorySuccess(response.data.profiles))
  } else {
    yield put(DirectoryActions.directoryFailure())
  }
}

export function * resetProfiles (action) {
  yield put(DirectoryActions.directoryRequest(1, action.searchParams))
}
