// @flow

// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import {
  Platform, View, ScrollView, Text, Image
} from 'react-native'
import styles from './Styles/DirectoryProfileScreenStyle'
import { connect } from 'react-redux'
import ProfileActions, { profileState } from '../Redux/ProfileRedux'
import { directoryState } from '../Redux/DirectoryRedux'

class DirectoryProfileScreen extends React.Component {

  constructor (props) {
    super(props)
  }

  async componentWillMount() {
    this._getProfileDataAsync();
  }

  _getProfileDataAsync = async () => {
    this.props.loadProfile(this.props.profileId, this.props.profiles)
  }

  render () {
    const {
      name, position, location, bio, profileImageUrl,
    } = this.props

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={ styles.container }>
          <View style={styles.topIntroSection}>
            <Image source={{ uri: profileImageUrl }}
            style={styles.image} />
            <Text style={styles.boldLabel}>{name}</Text>
            <Text style={styles.label}>
              { position }
            </Text>
            <Text style={styles.label}>
              { location }
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: directoryState(state).profiles,
    name: profileState(state).full_name,
    position: profileState(state).position_with_organization,
    location: profileState(state).location,
    bio: profileState(state).bio,
    profileImageUrl: profileState(state).avatar_url_medium,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProfile: (profileId, profiles) => dispatch(ProfileActions.profileRequest(profileId, profiles))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryProfileScreen)
