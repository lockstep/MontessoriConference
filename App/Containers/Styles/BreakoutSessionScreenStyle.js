// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  nameTitle: {
    ...Fonts.style.h5,
    color: Colors.seaBlue,
    padding: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderBottomColor: Colors.seaBlue,
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  commentTitle: {
    ...Fonts.style.h5,
    color: Colors.seaBlue,
    marginHorizontal: Metrics.baseMargin,
    marginTop: Metrics.doubleBaseMargin,
    textAlign: 'center',
    alignItems: 'center',
  },
  messageInput: {
    flexDirection: 'row'
  },
  sessionContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10
  },
  informationContainerWrapper: {
    flexDirection: 'row'
  },
  informationContainer: {
    marginTop: Metrics.baseMargin,
    flex: 1
  },
  information: {
    fontSize: 13,
    color: '#7d7d7d',
  },
  informationContent: {
    fontSize: 14,
    color: 'black',
  },
  description:{
    marginTop: 10,
    padding: 5
  }
})

