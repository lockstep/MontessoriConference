import React from 'react';
import { TextInput, View, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.clearText = this.clearText.bind(this);
  }

  clearText() {
    this._textInput.setNativeProps({text: ''})
  }

  render() {
    const { containerStyle, iconStyle, labelStyle, inputStyle } = styles;
    return (
      <View style={containerStyle}>
        <TextInput
          ref={component => this._textInput = component}
          style={inputStyle}
          placeholder={this.props.placeholder}
          autoCorrect={false}
          secureTextEntry={this.props.secureTextEntry}
          underlineColorAndroid='transparent'
          onChangeText={this.props.onChangeText}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    height: 40,
    backgroundColor: 'gray',
    padding: 5,
    flex: 1
  },
  iconStyle: {
    fontSize: 20,
    alignItems: 'center',
    lineHeight: (Platform.OS === 'ios') ? 40 : 28,
    color: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(0,0,0,0)',
    paddingLeft: 5,
    paddingRight: 5
  },
  labelStyle: {
    lineHeight: 42,
    fontSize: 18,
    backgroundColor: 'red'
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'white',
    borderRadius: 5
  }
}

export default Input;
