// @flow

import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Picker,
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
import CheckBox from 'react-native-checkbox-heaven'
import { lookup } from 'country-data'
import _ from 'lodash'

type RegisterScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void
}

class RegisterScreen extends React.Component {

  props: RegisterScreenProps

  state: {
    email: string,
    password: string,
    confirmation: string,
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

  constructor (props: RegisterScreenProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      position: 'Other',
      city: '',
      state: '',
      country: 'US',
      optedInToPublicDirectory: false,
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
    this.props.attemptRegister(this.state)
  }

  handlePressCancel = () => {
    if (this.props.fetching == true) {
      // do something to clear the login request
    }
    NavigationActions.pop()
    this.props.clearError();
  }

  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handleChangeConfirmation = (text) => {
    this.setState({ confirmation: text })
  }

  handleChangeFirstName = (text) => {
    this.setState({ firstName: text })
  }

  handleChangeLastName = (text) => {
    this.setState({ lastName: text })
  }

  handleChangePosition = (value, index) => {
    this.setState({ position: value })
  }

  handleChangeOrganization = (text) => {
    this.setState({ organization: text })
  }

  handleChangeCity = (text) => {
    this.setState({ city: text })
  }

  handleChangeState = (text) => {
    this.setState({ state: text })
  }

  handleChangeCountry = (text) => {
    this.setState({ country: text })
  }

  handleChangeListInDirectory = (checked) => {
    this.setState({ optedInToPublicDirectory: checked })
  }

  render () {
    const { email, password, confirmation, firstName, lastName, position, organization, city, state, country, optedInToPublicDirectory } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    const countries = lookup.countries({status: 'assigned'})
    const countryOptions = _.sortBy(countries, ['name']).map((country) => {
      console.log(country)
      return <Picker.Item key={country.alpha2} label={country.name} value={country.alpha2} />
    })
    return (
      <View style={Styles.mainContainer}>
        <AlertMessage />
        <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[{height: this.state.visibleHeight}]} keyboardShouldPersistTaps="always">
          <Text style={Styles.sectionTitle}>
            Welcome! Register below:
          </Text>
          <View style={Styles.form}>
            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('email')}</Text>
              <TextInput
                ref='email'
                style={textInputStyle}
                value={email}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeEmail}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.password.focus()}
                placeholder={I18n.t('email')} />
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
              <Text style={Styles.rowLabel}>{I18n.t('password_confirmation')}</Text>
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
                onChangeText={this.handleChangeConfirmation}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressRegister}
                placeholder={I18n.t('password_confirmation')} />
            </View>

            <View>
              <Text>Private Profile</Text>
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('firstName')}</Text>
              <TextInput
                ref='firstName'
                style={textInputStyle}
                value={firstName}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeFirstName}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressUpdate}
                placeholder={I18n.t('firstName')} />
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('lastName')}</Text>
              <TextInput
                ref='lastName'
                style={textInputStyle}
                value={lastName}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeLastName}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressUpdate}
                placeholder={I18n.t('lastName')} />
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('position')}</Text>
              <Picker
                selectedValue={position}
                onValueChange={this.handleChangePosition}>
                <Picker.Item label="Montessori Guide" value="Montessori Guide" />
                <Picker.Item label="Head of School" value="Head of School" />
                <Picker.Item label="Principal" value="Principal" />
                <Picker.Item label="Administrator" value="Administrator" />
                <Picker.Item label="Assistant" value="Assistant" />
                <Picker.Item label="Trainer" value="Trainer" />
                <Picker.Item label="Consultant" value="Consultant" />
                <Picker.Item label="Owner" value="Owner" />
                <Picker.Item label="Material Maker" value="Material Maker" />
                <Picker.Item label="Day Care Provider" value="Day Care Provider" />
                <Picker.Item label="Parent" value="Parent" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('organization')}</Text>
              <TextInput
                ref='organization'
                style={textInputStyle}
                value={organization}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeOrganization}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressUpdate}
                placeholder={I18n.t('organization')} />
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('city')}</Text>
              <TextInput
                ref='city'
                style={textInputStyle}
                value={city}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeCity}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressUpdate}
                placeholder={I18n.t('city')} />
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('state')}</Text>
              <TextInput
                ref='state'
                style={textInputStyle}
                value={state}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeState}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressUpdate}
                placeholder={I18n.t('state')} />
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>{I18n.t('country')}</Text>
              <Picker
                selectedValue={country}
                onValueChange={this.handleChangeCountry}>
                { countryOptions }
              </Picker>
            </View>

            <View style={Styles.row}>
              <Text>The Montessori Directory</Text>
              <Text style={Styles.boxedText}>Would you like to connect with other Montessorians 
              around the world? In an effort to bring our community 
              closer together we are hosting a global Montessori 
              Directory. Select the box below to add your profile to the 
              directory!</Text>
              <Text style={Styles.noteText}>NOTE: This is required in order to submit applictions for breakout sessions at conferences.</Text>
              <CheckBox
                label={I18n.t('optedInToPublicDirectory')}
                onChange={this.handleChangeListInDirectory}
                checked={optedInToPublicDirectory} />
            </View>
          </View>
        </ScrollView>
        <View style={Styles.registerBar}>
          <RoundedButton onPress={this.handlePressRegister} alternateStyle="darkButton" busy={this.props.fetching}>
            { I18n.t('signUp') }
          </RoundedButton>
        </View>
      </View>
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
    attemptRegister: (user) => dispatch(RegisterActions.registerRequest(user)),
    clearError: () => dispatch(ErrorActions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
