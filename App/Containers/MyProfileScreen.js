// @flow

import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/MyProfileScreenStyles'
import {Images, Metrics} from '../Themes'
import MyProfileActions from '../Redux/MyProfileRedux'
import LoginActions, { isLoggedIn, loginState } from '../Redux/LoginRedux'
import ErrorActions from '../Redux/ErrorRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import RoundedButton from '../Components/RoundedButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import AlertMessage from './AlertMessage'
import CheckBox from 'react-native-checkbox-heaven'

type MyProfileScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void
}

class MyProfileScreen extends React.Component {

  props: MyProfileScreenProps

  state: {
    firstName: string,
    lastName: string,
    position: string,
    organization: string,
    city: string,
    state: string,
    optedInToPublicDirectory: boolean,
    visibleHeight: number,
    topLogo: {
      width: number
    }
  }

  keyboardDidShowListener: Object
  keyboardDidHideListener: Object

  constructor (props: MyProfileScreenProps) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      position: 'Other',
      city: '',
      state: '',
      country: '',
      optedInToPublicDirectory: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.loggedIn) {
      NavigationActions.pop()
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressUpdate = () => {
    if (this.props.fetching == true) return;
    // attempt a login - a saga is listening to pick it up from here.
    this.props.clearError()
    this.props.attemptUpdateMyProfile(this.props.profileId, this.state)
  }

  handlePressCancel = () => {
    if (this.props.fetching == true) {
      // do something to clear the login request
    }
    NavigationActions.pop()
    this.props.clearError();
  }

  render () {
    const { firstName, lastName, position, organization, city, state, country, optedInToPublicDirectory } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly

    return (
      <View style={Styles.mainContainer}>
        <ScrollView style={Styles.container} contentContainerStyle={{justifyContent: 'center'}} keyboardShouldPersistTaps="always">
          <AlertMessage />
          <View style={Styles.form}>

            <View style={[Styles.row]}>
              <RoundedButton onPress={this.handlePressUpdate} alternateStyle="darkButton" busy={this.props.fetching}>
                { I18n.t('update') }
              </RoundedButton>
            </View>
          </View>

        </ScrollView>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    profileId: loginState(state).id,
    fetching: state.myProfile.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptRequestMyProfile: () => dispatch(MyProfileActions.myProfileRequest(email, password, confirmation)),
    attemptUpdateMyProfile: (profileId, profile) => dispatch(MyProfileActions.myProfileUpdateRequest(profile)),
    clearError: () => dispatch(ErrorActions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen)
