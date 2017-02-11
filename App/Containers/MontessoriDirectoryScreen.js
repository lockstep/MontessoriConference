// @flow

// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { Platform, View, ScrollView, Text, Image } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/MontessoriDirectoryScreenStyle'

class MontessoriDirectoryScreen extends React.Component {

  renderAndroidWarning () {
    if (Platform.OS === 'android') {
      return (
        <Text style={styles.sectionText}>
        Android only: Animations are slow? You are probably running the app in debug mode.
          It will run more smoothly once your app will be built.
          </Text>
      )
    }
    return null
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>
              The Montessori Directory
            </Text>
            <Text style={styles.subtitle} >The Subtitle</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default MontessoriDirectoryScreen
