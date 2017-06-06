// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: Colors.background
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4
  },
  row: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    // paddingBottom: Metrics.doubleBaseMargin,
    // paddingHorizontal: Metrics.doubleBaseMargin,
    // flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.seaBlue,
    backgroundColor: Colors.seaBlue,
    paddingBottom: Metrics.doubleBaseMargin,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  sectionTitle: ApplicationStyles.centeredSectionTitle,
})
