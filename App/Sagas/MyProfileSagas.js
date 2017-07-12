import { call, put } from 'redux-saga/effects'

// attempts to login
export function * getMyProfile (api, { userId }) {
}

export function * updateMyProfile (api, { profileId, profile }) {
  yield call(api.updateProfile, profileId, profile)
}
