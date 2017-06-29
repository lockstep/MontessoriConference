import { call, put } from 'redux-saga/effects'
import TmcApi from '../Services/TmcApi'
import BreakoutSessionListActions from '../Redux/BreakoutSessionListRedux'

export function * getBreakoutSessionList (api, action) {
  const response = yield call(api.getBreakoutSessionList);
  if (response.ok) {
    yield put(BreakoutSessionListActions.breakoutSessionListSuccess(response.data.breakout_sessions));

    // yield put(BreakoutSessionListActions.breakoutSessionListSuccess([
    //   {
    //     id: 1, name: 'hello', description: 'this is the first', start_time: '08:00', end_time: '10:00', organizers:[
    //       {user_id: 66, full_name: 'Sasitorn Aramcharoenrat'}
    //     ]
    //   },
    //   {
    //     id: 2, name: 'hello', description: 'this is the second', start_time: '10:00', end_time: '12:00', organizers:[
    //       {user_id: 66, full_name: 'Sasitorn Aramcharoenrat'}
    //     ]
    //   },
    // ]));
  } else {
    console.log('response not ok');

  }

  // const api = TmcApi.create()
  // const { page, searchParams } = action
  // // make the call to the api
  // const response = yield call(api.getProfiles, page, searchParams)

  // if (response.ok) {
  //   yield put(DirectoryActions.directorySuccess(response.data.profiles))
  // } else {
  //   yield put(DirectoryActions.directoryFailure())
  // }
}

export function * resetConferenceList (action) {
  // yield put(DirectoryActions.directoryRequest(1, action.searchParams))
}
