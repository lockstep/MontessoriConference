// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  messageInput: {
    flexDirection: 'row'
  },
  sessionContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10
  },
  informationContainer: {
    backgroundColor: '#f5f5f5'
  },
  information: {
    fontSize: 13,
    color: '#7d7d7d',
    padding: 5
  },
  informationContent: {
    fontSize: 14,
    color: 'black'
  },
  description:{
    marginTop: 10,
    padding: 5
  }
})

