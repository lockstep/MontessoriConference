// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Image, BackAndroid } from 'react-native'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressComponents = () => {
    this.toggleDrawer()
    NavigationActions.componentExamples()
  }

  handlePressDirectory = () => {
    this.toggleDrawer()
    NavigationActions.montessoriDirectory()
  }

  handlePressBreakoutSessions = () => {
    this.toggleDrawer()
    NavigationActions.breakoutSessionList()
  }

  handlePressConferencePhotos = () => {
    this.toggleDrawer()
    NavigationActions.conferencePhotos()
  }

  handlePressAboutUs = () => {
    this.toggleDrawer()
    NavigationActions.aboutUs()
  }

  handleRegister = () => {
    this.toggleDrawer()
    NavigationActions.register()
  }

  handleLogin = () => {
    this.toggleDrawer()
    NavigationActions.login()
  }

  handleMyProfile = () => {
    this.toggleDrawer()
    NavigationActions.myProfile()
  }

  handleLogOut = () => {
    this.toggleDrawer()
    this.props.attemptLogOut()
  }

  render () {
    const { loggedIn } = this.props;
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <DrawerButton text='Montessori Directory'
          onPress={this.handlePressDirectory} />
        <DrawerButton text='Breakout Sessions' onPress={this.handlePressBreakoutSessions} />
        <DrawerButton text='Conference Photos' onPress={this.handlePressConferencePhotos} />
        <DrawerButton text='About Us' onPress={this.handlePressAboutUs} />
        {
          !loggedIn &&
          <DrawerButton text='Register' onPress={this.handleRegister} />
        }
        {
          !loggedIn &&
          <DrawerButton text='Log In' onPress={this.handleLogin} />
        }
        { loggedIn &&
          <DrawerButton text='My Profile' onPress={this.handleMyProfile} />
        }
        { loggedIn &&
          <DrawerButton text='Log Out' onPress={this.handleLogOut} />
        }
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.login)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogOut: () => dispatch(LoginActions.logOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
