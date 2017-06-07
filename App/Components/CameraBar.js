import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Button from './Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../Themes/'

const CameraBar = ({ style, onPress }) => {
  const { cameraBarContainer } = styles;

  return (
    <View style={cameraBarContainer}>
      <Button
        iconName='camera'
        onPress={onPress} />
    </View>
  );
}

const styles = {
  cameraBarContainer: {
    backgroundColor: Colors.seaBlue,
    flexDirection: 'row',
    justifyContent: 'center'
  }
}

export default CameraBar;
