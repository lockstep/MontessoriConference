import { call, put } from 'redux-saga/effects'
import ConferencePhotosActions from '../Redux/ConferencePhotosRedux'
import S3Api from '../Services/S3Api'
import { Actions as NavigationActions } from 'react-native-router-flux'

import * as mime from 'react-native-mime-types'

export function * getConferencePhotos (api, action) {
  const { page } = action
  // make the call to the api
  const response = yield call(api.getConferencePhotos, page)

  if (response.ok) {
    // console.log('get feed items success', response.data);
    yield put(ConferencePhotosActions.conferencePhotosSuccess(response.data.images))
  } else {
    // console.log('get feed items failed');
    yield put(ConferencePhotosActions.conferencePhotosFailure())
  }
}

export function * resetConferencePhotos () {
  yield put(ConferencePhotosActions.conferencePhotosRequest(1))
}

const getFilename = (path) => {
  let splitFilenameArray = path.split('/');
  return splitFilenameArray[splitFilenameArray.length - 1];
}

export function * createConferencePhoto (api, { imagePath }) {
  // get S3 credentials
  const contentType = mime.lookup(imagePath);
  const filename = getFilename(imagePath);

  let response = yield call(api.getAwsCredentials, filename, contentType);
  if (response.ok) {
    // console.log('get credentials ok', response.data)
    const { credentials } = response.data;
    const s3api = S3Api.create(credentials.endpoint);
    response = yield call(s3api.storeImageToS3, credentials, filename, contentType, imagePath);

    if (response.ok) {
      // console.log('store image success', response)
      response = yield call(api.createConferencePhoto, credentials.key);
      if (response.ok) {
        NavigationActions.pop();
        yield put(ConferencePhotosActions.conferencePhotosReset());
      }
    }
  }

  if (!response.ok) {
    yield put(ConferencePhotosActions.createConferencePhotoFailure('error'));
  }
}
