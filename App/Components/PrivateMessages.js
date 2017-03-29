import React from 'react';
import { Text, View } from 'react-native';

const PrivateMessages = ({ messages }) => {
  if (messages && messages.length > 0) {

    const { containerStyle, messageStyle, agoContainerStyle, agoStyle } = styles;

    let messagesTags = messages.map((message) => {
      return (
        <View key={'message-' + message.id} style={containerStyle}>
          <Text style={messageStyle}>
            {message.message}
          </Text>
          <View style={agoContainerStyle}>
            <Text style={agoStyle}>You sent {message.created_at_time_ago_in_words} ago</Text>
          </View>
        </View>
      );
    })
    return (
      <View>
        {messagesTags}
      </View>
    );

  } else {
    return (
      <View>
        <Text>No messages</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5'
  },
  messageStyle: {
    fontSize: 16,
  },
  agoContainerStyle: {
    flexDirection: 'row-reverse'
  },
  agoStyle: {
    fontSize: 10
  }
}

export default PrivateMessages;
