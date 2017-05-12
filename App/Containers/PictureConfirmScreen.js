import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { Images } from '../Themes'
import CommentListActions from '../Redux/CommentListRedux'
import ConferencePhotosActions from '../Redux/ConferencePhotosRedux'

import styles from './Styles/PictureConfirmScreenStyle';

class PictureConfirmScreen extends Component {
  handlePressCancel = () => {
    NavigationActions.camera({
      callerInfo: this.props.callerInfo,
      type: 'replace'
    });
  }

  handlePressOk = () => {
    console.log('press OK');
    if (this.props.callerInfo.screen == 'breakoutSession') {
      this.props.sendCommentWithImage(this.props.callerInfo.breakoutSessionId, this.props.image);
    }

    if (this.props.callerInfo.screen == 'conferencePhotos') {
      this.props.createConferencePhoto(this.props.image);
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.confirmBar}>
          <TouchableOpacity onPress={this.handlePressCancel}>
            <View><Text style={styles.links}>Cancel</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePressOk}>
            <View><Text style={styles.links}>OK</Text></View>
          </TouchableOpacity>
        </View>
        <Image source={{uri: this.props.image, isStatic: true}} style={styles.confirmImage} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendCommentWithImage: (breakoutSessionId, imagePath) => dispatch(CommentListActions.sendCommentWithImage(breakoutSessionId, imagePath)),
    createConferencePhoto: (imagePath) => dispatch(ConferencePhotosActions.createConferencePhotoRequest(imagePath))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureConfirmScreen)
