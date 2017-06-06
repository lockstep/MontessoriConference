// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  name: {
    fontSize: 16,
    color: Colors.seaBlue,
    fontWeight: 'bold'
  },
  description:{
    marginTop: 5,
    color: Colors.grey
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
    marginHorizontal: Metrics.doubleBaseMargin,
    marginVertical: Metrics.doubleBaseMargin
  },
  detailContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dedede',
  }
})
