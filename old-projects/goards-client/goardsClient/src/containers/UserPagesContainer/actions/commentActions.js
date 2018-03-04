import constants from '../constants'

export function createComment(token) {
  return {
    type: constants.COMMENT_CREATE_REQUEST,
    token: token,
  }
}

export function fetchComments(token) {
  return {
    type: constants.COMMENTS_FETCH_REQUEST,
    token: token,
  };
}

export function editComment(commentId, formSubmitData, token) {
  return {
    type: constants.COMMENT_EDIT_REQUEST,
    commentId: commentId,
    formSubmitData: formSubmitData,
    token: token,
  };
}

export function deleteComment(commentId, token) {
  return {
    type: constants.COMMENT_DELETE_REQUEST,
    commentId: commentId,
    token: token,
  };
}

export function broadcastCommentCreated(comment) {
  return {
    type: constants.COMMENT_CREATED,
    comment: comment,
  };
}

export function broadcastCommentsFetched(comments) {
  return {
    type: constants.COMMENTS_FETCHED,
    comments: comments,
  };
}

export function broadcastCommentEdited(commentId, comment) {
  return {
    type: constants.COMMENT_EDITED,
    commentId: commentId,
    comment: comment,
  };
};

export function broadcastCommentDeleted(commentId) {
  return {
    type: constants.COMMENT_DELETED,
    commentId: commentId,
  };
}
