import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ShutterButton = ({ style, onPress }) => {
  const { buttonStyle, outterButtonStyle, spacerButtonStyle, innerButtonStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[style]}>
      <View style={outterButtonStyle}>
        <View style={spacerButtonStyle}>
          <View style={innerButtonStyle}></View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  outterButtonStyle: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spacerButtonStyle: {
    backgroundColor: 'black',
    width: 25,
    height: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerButtonStyle: {
    backgroundColor: 'white',
    width: 23,
    height: 23,
    borderRadius: 23
  }
}

export default ShutterButton;
