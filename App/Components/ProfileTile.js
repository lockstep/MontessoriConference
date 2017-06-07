import React, { PropTypes } from 'react'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import styles from '../Containers/Styles/MontessoriDirectoryScreenStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'

export default class ProfileTile extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    avatar_url_small: PropTypes.string,
    full_name: PropTypes.string,
    position_with_organization: PropTypes.string,
    full_address_country: PropTypes.string,
  }

  handlePressTile = () => {
    NavigationActions.directoryProfile({
      profileId: this.props.id, title: this.props.first_name
    });
  }

  render () {
    return (
      <TouchableOpacity onPress={ this.handlePressTile }>
        <View style={styles.row}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: this.props.avatar_url_small }}
              style={styles.image} />
          </View>
          <View style={styles.info}>
            <Text style={styles.boldLabel}>{this.props.full_name}</Text>
            <Text style={styles.label} numberOfLines={1}>
              {this.props.position_with_organization}
            </Text>
            <Text style={styles.label} numberOfLines={1}>
              {this.props.full_address_country}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
