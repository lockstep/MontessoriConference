// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  formWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Metrics.doubleBaseMargin + Metrics.baseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: Metrics.mediumMargin,
  },
  searchInput: {
    flex: 6,
    height: Metrics.searchBarHeight,
    textAlign: 'left',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
  },
  searchIcon: {
    top: 3,
    flex: 1,
    textAlign: 'center',
    color: Colors.deepBlue,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  info: {
    flex: 3
  },
  image: {
    width: Metrics.images.large,
    height: Metrics.images.large,
    overlayColor: Colors.background,
    borderRadius: Metrics.images.large / 2
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: Metrics.font.medium,
    color: Colors.coal,
    marginBottom: Metrics.tinyMargin
  },
  label: {
    fontSize: Metrics.font.default,
    color: Colors.coal,
  },
  listContent: {
  }
})
