// @flow

// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import {
  Platform, View, ScrollView, Text, Image
} from 'react-native'
import styles from './Styles/BreakoutSessionScreenStyle'
import { connect } from 'react-redux'
import BreakoutSessionActions, { breakoutSessionState } from '../Redux/BreakoutSessionRedux'
import { breakoutSessionListState } from '../Redux/BreakoutSessionListRedux'
import { isLoggedIn } from '../Redux/LoginRedux'
import CommentListActions, { commentListState } from '../Redux/CommentListRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RoundedButton from '../Components/RoundedButton'
import Input from '../Components/Input';
import Button from '../Components/Button';
import Comments from '../Components/Comments';
import ProfileTile from '../Components/ProfileTile';

class BreakoutSessionScreen extends React.Component {

  constructor (props) {
    super(props)
  }

  async componentWillMount() {
    this._getBreakoutSessionDataAsync();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.loggedIn && nextProps.loggedIn) {
      this.props.getComments(this.props.breakoutSessionId);
    }
  }

  _getBreakoutSessionDataAsync = async () => {
    console.log('get breakout session');
    this.props.loadBreakoutSession(this.props.breakoutSessionId, this.props.breakoutSessionList)
    this.props.getComments(this.props.breakoutSessionId)
  }

  handleTakeSnapshot = () => {
    NavigationActions.camera({
      callerInfo: {
        screen: 'breakoutSession',
        breakoutSessionId: this.props.breakoutSessionId,
        name: this.props.name
      }
    });
  }

  handleChangeText(text) {
    this.setState({comment: text});
  }

  handleSendComment() {
    console.log('should send comment: ' + this.state.comment);
    // Calling a service to send comment
    this.props.sendComment(this.props.breakoutSessionId, this.state.comment);

    this._input.clearText();
    this.setState({comment: ''});
  }

  render () {
    const {
      name, description, day, start_time, end_time, location_name, organizers
    } = this.props.breakoutSession;

    const { loggedIn, comments } = this.props;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.sessionContainer}>
          <Text style={styles.nameTitle}>{name}</Text>
          { organizers.map(organizer => {
            return <ProfileTile { ...organizer }/>
          })}
          <View style={styles.informationContainerWrapper}>
            <View style={styles.informationContainer}>
              <Text style={[styles.information]}>DATE:</Text>
              <Text style={[styles.informationContent]}>{day}</Text>
            </View>
            <View style={styles.informationContainer}>
              <Text style={[styles.information]}>TIME:</Text>
              <Text style={[styles.informationContent]}>{start_time} - {end_time}</Text>
            </View>
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.information}>LOCATION:</Text>
            <Text style={[styles.informationContent]}>{location_name}</Text>
          </View>
          {
            (description || '').length > 0 &&
            <View style={styles.informationContainer}>
              <Text style={styles.information}>DESCRIPTION:</Text>
              <Text style={[styles.informationContent]}>{description}</Text>
            </View>
          }
          <Text style={styles.commentTitle}>Discussion</Text>
          <Comments comments={comments} />
          { !loggedIn &&
            <View style={styles.section}>
              <RoundedButton onPress={NavigationActions.login} alternateStyle='darkButton'>
                Log In To Comment
              </RoundedButton>
            </View>
          }
        </ScrollView>
        { loggedIn &&
          <View>
            <View style={styles.messageInput}>
              <Button
                iconName='camera'
                onPress={this.handleTakeSnapshot} />
              <Input
                ref={input => this._input = input}
                placeholder='Type message here...'
                onChangeText={this.handleChangeText.bind(this)}
              />
              <Button
                iconName='paper-plane'
                onPress={this.handleSendComment.bind(this)}/>
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
    breakoutSessionList: breakoutSessionListState(state).breakoutSessionList,
    breakoutSession: breakoutSessionState(state),
    loggedIn: isLoggedIn(state.login),
    comments: commentListState(state).comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBreakoutSession: (breakoutSessionId, breakoutSessionList) => dispatch(BreakoutSessionActions.breakoutSessionRequest(breakoutSessionId, breakoutSessionList)),
    sendComment: (breakoutSessionId, comment) => dispatch(CommentListActions.sendComment(breakoutSessionId, comment)),
    getComments: (breakoutSessionId) => dispatch(CommentListActions.getComments(breakoutSessionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreakoutSessionScreen)
