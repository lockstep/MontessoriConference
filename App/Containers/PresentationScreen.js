import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'

import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/PresentationScreenStyles'

export default class PresentationScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.clearLogo} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText} >
              Welcome to the Montessori Community application!
              Build relationships before, during and after the conference
              with the resources below:
            </Text>
          </View>

          <RoundedButton onPress={NavigationActions.montessoriDirectory}>
            Montessori Directory
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.breakoutSessionList}>
            Breakout Sessions
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.aboutUs}>
            About Us
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.timeline}>
            Timeline
          </RoundedButton>

          <RoundedButton onPress={NavigationActions.test}>
            Test
          </RoundedButton>


          <View style={styles.centered}>
            <Text style={styles.subtitle}>
              Made with ❤️ by The Montessori Company
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}
