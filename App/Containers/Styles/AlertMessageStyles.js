import { Platform, StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default {
  container: {
    justifyContent: 'center',
    backgroundColor: '#ed5b47',
    top: 0,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20
    // marginTop: (Platform.OS === 'ios') ? 25 : 0,
  },
  message: {
    flex: 5,
    color: 'white'
  },
  icon: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
    color: 'white'
  }
}
