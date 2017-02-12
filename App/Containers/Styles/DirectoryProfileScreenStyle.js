// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topIntroSection: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  image: {
    width: Metrics.images.extraLarge,
    height: Metrics.images.extraLarge,
    borderRadius: Metrics.images.extraLarge / 2,
    overlayColor: Colors.background,
    marginVertical: Metrics.doubleBaseMargin,
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: Metrics.font.extraLarge,
    color: Colors.coal,
    marginBottom: Metrics.smallMargin
  },
  label: {
    fontSize: Metrics.font.medium,
    color: Colors.coal,
    marginBottom: Metrics.smallMargin
  },
})
