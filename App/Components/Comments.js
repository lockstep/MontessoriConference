import React from 'react';
import { Text, View } from 'react-native';

const Comments = ({ comments }) => {
  if (comments && comments.length > 0) {

    const { containerStyle, commentStyle, agoContainerStyle, agoStyle } = styles;

    let commentsTags = comments.map((comment) => {
      return (
        <View key={'comment-' + comment.id} style={containerStyle}>
          <Text style={commentStyle}>
            {comment.message}
          </Text>
        </View>
      );
    })
    return (
      <View>
        {commentsTags}
      </View>
    );

  } else {
    return (
      <View>
        <Text>No comments</Text>
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
  commentStyle: {
    fontSize: 16,
  },
  agoContainerStyle: {
    flexDirection: 'row-reverse'
  },
  agoStyle: {
    fontSize: 10
  }
}

export default Comments;
