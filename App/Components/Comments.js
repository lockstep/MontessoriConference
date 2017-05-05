import React from 'react';
import { Text, View, Image } from 'react-native';

const Comments = ({ comments }) => {
  if (comments && comments.length > 0) {

    const { containerStyle, commentStyle, agoContainerStyle, agoStyle } = styles;

    let commentsTags = comments.map((comment) => {
      return (
        <View key={'comment-' + comment.id} style={styles.descriptionContainer}>
          <Image source={{uri: comment.author.avatar_url_small}} style={styles.image}/>
          <View style={styles.messageContainerStyle}>
            <Text style={styles.authorStyle}>
              {comment.author.full_name} · {comment.author.position_with_organization}
            </Text>
            <Text style={[styles.commentStyle]}>
              {comment.message}
            </Text>
          </View>
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
        <Text style={[styles.commentStyle]}>No comments available</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  authorStyle: {
    fontSize: 12,
    color: '#7d7d7d'
  },
  commentStyle: {
    fontSize: 14,
    marginTop: 10
  },
  agoContainerStyle: {
    flexDirection: 'row-reverse'
  },
  agoStyle: {
    fontSize: 10
  },
  descriptionContainer:{
    flexDirection: 'row',
    paddingRight: 30,
    paddingTop: 30
  },
  messageContainerStyle: {
    marginLeft: 15,
    paddingLeft: 5,
    paddingRight: 5
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
}

export default Comments;
