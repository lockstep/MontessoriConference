import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { Images } from '../Themes'
import PhotoActions, { photoState } from '../Redux/PhotoRedux'
import Spinner from '../Components/Spinner'

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
    let { isUploading } = this.props;
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
        { isUploading &&
          <View style={styles.uploadingContainer}>
            <View style={styles.uploading}>
              <Spinner />
            </View>
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isUploading: photoState(state).uploading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendCommentWithImage: (breakoutSessionId, imagePath) => dispatch(PhotoActions.sendCommentWithImageRequest(breakoutSessionId, imagePath)),
    createConferencePhoto: (imagePath) => dispatch(PhotoActions.createConferencePhotoRequest(imagePath))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureConfirmScreen)
