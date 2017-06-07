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
            The Association Montessori Internationale (AMI) was founded in 1929 by Maria Montessori to maintain the integrity of her life’s work and to ensure that it would be perpetuated after her death. AMI is the recognised international authority for Montessori education. During its long history AMI has fostered the growth and development of Montessori programmes and teacher training, along with supporting the development and education of children and young adults in a vast variety of settings throughout the world.
            </Text>
            <Text style={styles.sectionText}>
              AMI is a Non-Governmental Organisation (NGO) associated with the United Nations Department of Public Information (since 1985) and a NGO in operational relations with UNESCO (since 1962).

            
          </Text>
              <Text style={styles.sectionText}>
              ~
              </Text>
            <Text style={styles.sectionText}>
              The Montessori Company is dedicated to helping guides create
              wonderful experiences and environments for their children.
              We partnered with AMI to further this effort by facilitating
              better communication and collaboration among guides everywhere
            via this mobile app and The Montessori Directory online
            TheMontessoriCompany.com.
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
