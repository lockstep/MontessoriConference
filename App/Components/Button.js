import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = ({ style, onPress, children, iconName }) => {
  const { buttonStyle, containerStyle, textStyle, iconStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <View style={containerStyle}>
        {iconName ? (<Icon name={iconName} style={iconStyle} />) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  buttonStyle: {
    backgroundColor: '#0c7abf',
  },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40
  },
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  iconStyle: {
    color: 'white',
    fontSize: 18
  }
}

export default Button;
