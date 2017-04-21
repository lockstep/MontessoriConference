import { takeLatest } from 'redux-saga'
import TmcApi from '../Services/TmcApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { TemperatureTypes } from '../Redux/TemperatureRedux'
import { DirectoryTypes } from '../Redux/DirectoryRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
import { PrivateMessageTypes } from '../Redux/PrivateMessageRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, loginSuccess } from './LoginSagas'
import { getTemperature } from './TemperatureSagas'
import { getProfiles, resetProfiles } from './DirectorySagas'
import { openScreen } from './OpenScreenSagas'
import { sendMessage, getMessages } from './PrivateMessageSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugSettings.useFixtures ? FixtureAPI : TmcApi.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGIN_SUCCESS, loginSuccess, api),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),

    takeLatest(DirectoryTypes.DIRECTORY_REQUEST, getProfiles),
    takeLatest(DirectoryTypes.DIRECTORY_RESET, resetProfiles),

    takeLatest(PrivateMessageTypes.SEND_MESSAGE, sendMessage, api),
    takeLatest(PrivateMessageTypes.GET_MESSAGES, getMessages, api)

    // some sagas receive extra parameters in addition to an action
    // takeLatest(TemperatureTypes.TEMPERATURE_REQUEST, getTemperature, api)
  ]
}
