// @flow

import React from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/AboutUsScreenStyle'

export default class AboutUsScreen extends React.Component {

  constructor (props: Object) {
    super(props)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container} ref='container'>

          <View style={styles.section}>
            <Text style={styles.sectionText}>
              AMI is the custodian and cultivator of Montessori philosophy and
              pedagogy, seeking to maintain the integrity of Montessori’s legacy
              and increase capacity to serve children around the world.
            </Text>
            <Text style={styles.sectionText}>
              MIP, in line with AMI’s vision and goals, inspires and educates
              children, parents and teachers from the CR and the whole of Central
              and Eastern Europe. It contributes to cultivation and development
              of education on national and international levels and provides space
              and support to the development of human potential.
            </Text>
            <Text style={styles.sectionText}>
              All Rights Reserved © MIP 2016
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
