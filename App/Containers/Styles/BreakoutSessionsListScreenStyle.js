// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  name: {
    fontSize: 16,
    color: '#009ee2',
    fontWeight: 'bold'
  },
  description:{
    marginTop: 5,
    color: 'grey'
  },
  time: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10
  },
  detailContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dedede',
    marginTop: 10,
    marginBottom: 10
  }
})
