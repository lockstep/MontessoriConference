import { call, put } from 'redux-saga/effects'
import CommentListActions from '../Redux/CommentListRedux'

// attempts to login
export function * sendComment (api, { breakoutSessionId, comment }) {
  // yield put (CommentListActions.getComments(breakoutSessionId));
  console.log('SAGA: sending comment', breakoutSessionId, comment);
  if (comment === '') {

  } else {
    const response = yield call(api.sendComment, breakoutSessionId, comment);
    console.log(response);
    if (response.ok) {
      console.log('send comment success');
      yield put(CommentListActions.getComments(breakoutSessionId));
    } else {
      console.log('error');
      yield put(CommentListActions.sendCommentFailure('error'));
    }
  }
}

export function * getComments (api, { breakoutSessionId }) {
  console.log('SAGA: getComments', breakoutSessionId);

  const response = yield call(api.getComments, breakoutSessionId);
  if (response.ok) {
    yield put(CommentListActions.getCommentsSuccess(response.data.comments));
  } else {

  }
}

// export function * loginSuccess (api, { uid, client, accessToken, expiry }) {
//   yield call(api.saveCredentials, accessToken, uid, client, expiry);
// }
