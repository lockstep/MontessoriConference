// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1
  },
  confirmBar: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: Metrics.navBarHeight
  },
  links: {
    color: 'white',
    margin: 10
  },
  confirmImage: {
    flex: 1
  }
})

