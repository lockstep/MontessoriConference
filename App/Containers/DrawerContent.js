// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
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

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <DrawerButton text='Montessori Directory'
          onPress={this.handlePressDirectory} />
        <DrawerButton text='Breakout Sessions' onPress={this.handlePressBreakoutSessions} />
        <DrawerButton text='Conference Photos' onPress={this.handlePressConferencePhotos} />
        <DrawerButton text='About Us' onPress={this.handlePressAboutUs} />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
