import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Camera from 'react-native-camera';
import { Actions as NavigationActions } from 'react-native-router-flux';

import styles from './Styles/CameraScreenStyle';

import ShutterButton from '../Components/ShutterButton';

class CameraScreen extends Component {

  handlePressCancel = () => {
    NavigationActions.pop();
  }

  handleCaptureImage = () => {
    const options = {};
    this.camera.capture({metadata: options})
      .then((data) => {
        NavigationActions.pictureConfirm({
          breakoutSessionId: this.props.breakoutSessionId,
          name: this.props.name,
          image: data.path,
          type: 'replace'
        })
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}>
        </Camera>
        <View style={styles.cameraBar}>
          <TouchableOpacity onPress={this.handlePressCancel} style={styles.cancelLink}>
            <View><Text style={{color: 'white'}}>Cancel</Text></View>
          </TouchableOpacity>
          <ShutterButton onPress={this.handleCaptureImage}></ShutterButton>
        </View>
      </View>
    )
  }
}

export default CameraScreen;
