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
      // <View style={styles.mainContainer}>
      //   <ScrollView style={ styles.container }>
      //     <View style={styles.topIntroSection}>
      //       <Image source={{ uri: profileImageUrl }}
      //       style={styles.image} />
      //       <Text style={styles.boldLabel}>{name}</Text>
      //       <Text style={styles.label}>
      //         { position }
      //       </Text>
      //       <Text style={styles.label}>
      //         { location }
      //       </Text>
      //     </View>
      //     <Text style={styles.sectionTitle}>
      //       Private Messages
      //     </Text>
      //     <PrivateMessages messages={messages} />
      //     { !loggedIn &&
      //       <View style={styles.section}>
      //         <RoundedButton onPress={NavigationActions.login}>
      //           Log In To Send Messages
      //         </RoundedButton>
      //       </View>
      //     }

      //   </ScrollView>
      //   { loggedIn &&
      //     <View>
      //       <View style={styles.messageInput}>
      //         <Input
      //           ref={input => this._input = input}
      //           placeholder='Type message here...'
      //           onChangeText={this.handleChangeText.bind(this)}
      //         />
      //         <Button
      //           iconName='paper-plane'
      //           onPress={this.handleSendComment.bind(this)}/>
      //       </View>
      //       <KeyboardSpacer />
      //     </View>
      //   }
      // </View>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.sessionContainer}>
          <View style={styles.informationContainer}>
            <Text style={[styles.information]}>
              DATE:
              <Text style={[styles.informationContent]}> {day}</Text>
            </Text>
            <Text style={[styles.information]}>
              SESSION TIME:
              <Text style={[styles.informationContent]}> {start_time} - {end_time}</Text>
            </Text>
            <Text style={[styles.information]}>
              LOCATION:
              <Text style={[styles.informationContent]}> {location_name}</Text>
            </Text>
            <Text style={[styles.description]}>{description}</Text>
          </View>
          <Comments comments={comments} />
          { !loggedIn &&
            <View style={styles.section}>
              <RoundedButton onPress={NavigationActions.login}>
                Log In To Comment
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
