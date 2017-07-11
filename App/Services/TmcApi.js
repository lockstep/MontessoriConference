// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import * as mime from 'react-native-mime-types'

const getFilename = (path) => {
  let splitFilenameArray = path.split('/');
  return splitFilenameArray[splitFilenameArray.length - 1];
}

const BASE_URL = __DEV__ ?
 'http://0.0.0.0:3000' : 'https://www.themontessoricompany.com'
// const BASE_URL = 'https://www.themontessoricompany.com'
// const BASE_URL = 'https://themontessoricompany-staging.herokuapp.com'

// our "constructor"
const create = (baseURL = BASE_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
    },
    // 10 second timeout...
    timeout: 10000
  })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const login = (email, password) => api.post('/api/v1/users/sign_in', {email, password})
  const logOut = () => api.delete('/api/v1/users/sign_out')
  const register = (email, password, confirmation) => api.post('/api/v1/users', {email, password, password_confirmation: confirmation})
  const getProfiles = (page, searchParams) => {
    return api.get('/directory', Object.assign({ page }, searchParams))
  }
  const saveCredentials = (uid, client, accessToken, expiry) => {
    console.log('saveCredentials', uid, client, accessToken)
    api.addRequestTransform(request => {
      request.headers['access-token'] = accessToken;
      request.headers['token-type'] = 'Bearer';
      request.headers['uid'] = uid;
      request.headers['client'] = client;
      request.headers['expiry'] = expiry;
    })
  }
  const sendMessage = (profileId, message) => api.post(`/api/v1/users/${profileId}/send_message`, {feed_item: {message}})
  const getMessages = (profileId) => api.get(`/api/v1/users/${profileId}/private_messages`)
  const getBreakoutSessionList = () => api.get('/api/v1/conferences/1/breakout_sessions')
  const sendComment = (breakoutSessionId, message) => api.post(`/api/v1/breakout_sessions/${breakoutSessionId}/comments`, {feed_item: {message}})
  const getComments = (breakoutSessionId) => api.get(`/api/v1/breakout_sessions/${breakoutSessionId}/comments`)
  const getAwsCredentials = (filename, content_type) => api.get('/api/v1/aws_s3_auth', {filename, content_type})
  const createCommentWithImage = (breakoutSessionId, imageUrl) => api.post(`/api/v1/breakout_sessions/${breakoutSessionId}/comments`, {feed_item: {raw_image_s3_key: imageUrl}})
  const getConferencePhotos = (page) => {
    return api.get('/api/v1/conferences/1/images', Object.assign({ page }))
  }
  const createConferencePhoto = (imageUrl) => api.post('/api/v1/conferences/1/images', {feed_item: {raw_image_s3_key: imageUrl}})

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    login,
    logOut,
    register,
    saveCredentials,
    getProfiles,
    sendMessage,
    getMessages,
    getBreakoutSessionList,
    sendComment,
    getComments,
    getAwsCredentials,
    createCommentWithImage,
    getConferencePhotos,
    createConferencePhoto
  }
}

// let's return back our create method as the default.
export default {
  create
}
