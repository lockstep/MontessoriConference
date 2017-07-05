// @flow

import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/RegisterScreenStyles'
import {Images, Metrics} from '../Themes'
import RegisterActions from '../Redux/RegisterRedux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import ErrorActions from '../Redux/ErrorRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import RoundedButton from '../Components/RoundedButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import AlertMessage from './AlertMessage'

type RegisterScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void
}

class RegisterScreen extends React.Component {

  props: RegisterScreenProps

  state: {
    username: string,
    password: string,
    confirmation: string,
    visibleHeight: number,
    topLogo: {
      width: number
    }
  }

  keyboardDidShowListener: Object
  keyboardDidHideListener: Object

  constructor (props: RegisterScreenProps) {
    super(props)
    this.state = {
      username: '',
      password: '',
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

  handlePressRegister = () => {
    if (this.props.fetching == true) return;
    // attempt a login - a saga is listening to pick it up from here.
    this.props.clearError()
    const { username, password, confirmation } = this.state
    this.props.attemptRegister(username, password, confirmation)
  }

  handlePressCancel = () => {
    if (this.props.fetching == true) {
      // do something to clear the login request
    }
    NavigationActions.pop()
    this.props.clearError();
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handleChangeconfirmation = (text) => {
    this.setState({ confirmation: text })
  }

  render () {
    const { username, password, confirmation } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps="always">
        <AlertMessage />
        <Text style={Styles.sectionTitle}>
          Welcome! Register below:
        </Text>
        <View style={Styles.form}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('username')}</Text>
            <TextInput
              ref='username'
              style={textInputStyle}
              value={username}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder={I18n.t('username')} />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('password')}</Text>
            <TextInput
              ref='password'
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressRegister}
              placeholder={I18n.t('password')} />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('password')}</Text>
            <TextInput
              ref='confirmation'
              style={textInputStyle}
              value={confirmation}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangeconfirmation}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressRegister}
              placeholder={I18n.t('password')} />
          </View>

          <View style={[Styles.row]}>
            <RoundedButton onPress={this.handlePressRegister} alternateStyle="darkButton" busy={this.props.fetching}>
              { I18n.t('signUp') }
            </RoundedButton>
            <RoundedButton onPress={NavigationActions.pop} alternateStyle="darkButton">
              { I18n.t('cancel') }
            </RoundedButton>
          </View>
        </View>

      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.register.fetching,
    loggedIn: isLoggedIn(state.login)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptRegister: (username, password, confirmation) => dispatch(RegisterActions.registerRequest(username, password, confirmation)),
    clearError: () => dispatch(ErrorActions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
