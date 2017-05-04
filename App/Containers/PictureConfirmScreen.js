import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { Images } from '../Themes'
import CommentListActions from '../Redux/CommentListRedux'

import styles from './Styles/PictureConfirmScreenStyle';

class PictureConfirmScreen extends Component {
  handlePressCancel = () => {
    NavigationActions.camera({
      breakoutSessionId: this.props.breakoutSessionId,
      name: this.props.name,
      type: 'replace'
    });
  }

  handlePressOk = () => {
    console.log('press OK');
    // creating a message
    this.props.sendCommentWithImage(this.props.breakoutSessionId, this.props.image);
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureConfirmScreen)
