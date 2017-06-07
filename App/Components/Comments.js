import React from 'react';
import { Text, View, Image } from 'react-native';

const Comments = ({ comments }) => {
  if (comments && comments.length > 0) {

    const {
      containerStyle,
      messageContainerStyle,
      authorNameStyle,
      commentStyle,
      imageCommentContainerStyle,
      imageCommentStyle,
      italicizedCommentStyle
    } = styles;

    let commentsTags = comments.map((comment) => {
      return (
        <View key={'comment-' + comment.id} style={containerStyle}>
          <Image source={{uri: comment.author.avatar_url_small}} style={styles.image}/>
          <View style={messageContainerStyle}>
            <Text style={authorNameStyle}>
              {comment.author.full_name} · {comment.author.position_with_organization}
            </Text>
            { (comment.message || '').length > 0 &&
              <Text style={commentStyle}>
                {comment.message}
              </Text>
            }
            { comment.image_url_large &&
              <View style={imageCommentContainerStyle}>
                <Image
                  resizeMode={'contain'}
                  source={{uri: comment.image_url_large}}
                  style={imageCommentStyle}/>
              </View>
            }
            {
              (comment.message || '').length === 0 && !comment.image_url_large &&
                <Text style={italicizedCommentStyle}>
                  Image processing, please check back in a bit!
                </Text>
            }
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
  authorNameStyle: {
    fontSize: 12,
    color: '#7d7d7d'
  },
  commentStyle: {
    fontSize: 14,
    marginTop: 10
  },
  italicizedCommentStyle: {
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic'
  },
  containerStyle:{
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'flex-start',
    flex: 1
  },
  messageContainerStyle: {
    marginLeft: 15,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  imageCommentContainerStyle: {
    flexDirection: 'row'
  },
  imageCommentStyle: {
    flex: 1,
    height: 200,
    marginTop: 10
  }
}

export default Comments;
