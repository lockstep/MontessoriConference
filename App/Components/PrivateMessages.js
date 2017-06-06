import React from 'react';
import { Text, View } from 'react-native';
import { Colors, Metrics } from '../Themes/'

const PrivateMessages = ({ messages, messagesError, login }) => {
  if (messages && messages.length > 0 && !messagesError) {

    const { messageStyle, agoContainerStyle, agoStyle } = styles;

    let messagesTags = messages.map((message) => {
      const fromMe = message.author.id === login.id
      const commentStyle = fromMe ?  "myCommentStyle" : "theirCommentStyle"
      return (
        <View key={'message-' + message.id} style={styles[commentStyle]}>
          <Text style={messageStyle}>
            {message.message}
          </Text>
          {
            fromMe &&
              <View style={agoContainerStyle}>
                <Text style={agoStyle}>
                  You sent {message.created_at_time_ago_in_words} ago
                </Text>
              </View>
          }
          {
            !fromMe &&
              <View style={agoContainerStyle}>
                <Text style={agoStyle}>
                  {message.author.first_name} sent {message.created_at_time_ago_in_words} ago
                </Text>
              </View>

          }
        </View>
      );
    })
    return (
      <View style={ { marginBottom: 20 } }>
        {messagesTags}
      </View>
    );

  } else if(messagesError) {
    return (
      <View style={ styles.errorCommentStyle }>
        <Text>{messagesError}</Text>
      </View>
    )
  } else {
    return (
      <View style={ styles.myCommentStyle }>
        <Text>No messages</Text>
      </View>
    );
  }
}

const styles = {
  errorCommentStyle: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: Metrics.marginHorizontal + 5,
    backgroundColor: Colors.error
  },
  myCommentStyle: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: Metrics.marginHorizontal + 5,
    backgroundColor: '#f5f5f5'
  },
  theirCommentStyle: {
    padding: 10,
    marginHorizontal: Metrics.marginHorizontal + 5,
    marginTop: 10,
    backgroundColor: '#e2eff5'
  },
  messageStyle: {
    fontSize: 16,
  },
  agoContainerStyle: {
    flexDirection: 'row-reverse'
  },
  agoStyle: {
    fontSize: 10,
    marginTop: 10
  }
}

export default PrivateMessages;
