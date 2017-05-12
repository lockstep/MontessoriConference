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
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  conferencePhotoContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    margin: 10
  },
  conferencePhoto: {
    height: 300,
    flex: 1,
    width: null
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
