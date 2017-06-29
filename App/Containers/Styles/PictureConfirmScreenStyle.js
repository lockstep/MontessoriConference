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
  },
  uploadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  uploading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

