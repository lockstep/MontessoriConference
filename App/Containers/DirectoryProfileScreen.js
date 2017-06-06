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
import { loginState, isLoggedIn } from '../Redux/LoginRedux'
import PrivateMessageActions, { privateMessageState } from '../Redux/PrivateMessageRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RoundedButton from '../Components/RoundedButton'
import Input from '../Components/Input';
import Button from '../Components/Button';
import PrivateMessages from '../Components/PrivateMessages';

class DirectoryProfileScreen extends React.Component {

  constructor (props) {
    super(props)
  }

  async componentWillMount() {
    this._getProfileDataAsync();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.loggedIn && nextProps.loggedIn) {
      this.props.getMessages(this.props.profileId);
    }
  }

  _getProfileDataAsync = async () => {
    this.props.loadProfile(this.props.profileId, this.props.profiles)
    this.props.getMessages(this.props.profileId)
  }

  handleChangeText(text) {
    this.setState({message: text});
  }

  handleSendMessage() {
    // console.log('should send message: ' + this.state.message);
    // Calling a service to send message
    this.props.sendMessage(this.props.profileId, this.state.message);

    this._input.clearText();
    this.setState({message: ''});
  }

  render () {
    const {
      name, position, location, bio, profileImageUrl, loggedIn, messages,
      login, messagesError
    } = this.props;

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
          {
            loggedIn &&
            <Text style={styles.sectionTitle}>
              Private Messages
            </Text>
          }
          {
            loggedIn && <PrivateMessages messages={messages} messagesError={messagesError} login={login} />
          }
          { !loggedIn &&
            <View style={styles.section}>
              <RoundedButton onPress={NavigationActions.login} alternateStyle="darkButton">
                Log In To Send Messages
              </RoundedButton>
            </View>
          }

        </ScrollView>
        { loggedIn &&
          <View>
            <View style={styles.messageInput}>
              <Input
                ref={input => this._input = input}
                placeholder='Type message here...'
                onChangeText={this.handleChangeText.bind(this)}
              />
              <Button
                iconName='paper-plane'
                onPress={this.handleSendMessage.bind(this)}/>
            </View>
            <KeyboardSpacer />
          </View>
        }
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
    loggedIn: isLoggedIn(state.login),
    login: loginState(state),
    messages: privateMessageState(state).messages,
    messagesError: privateMessageState(state).error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProfile: (profileId, profiles) => dispatch(ProfileActions.profileRequest(profileId, profiles)),
    sendMessage: (profileId, message) => dispatch(PrivateMessageActions.sendMessage(profileId, message)),
    getMessages: (profileId) => dispatch(PrivateMessageActions.getMessages(profileId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryProfileScreen)
