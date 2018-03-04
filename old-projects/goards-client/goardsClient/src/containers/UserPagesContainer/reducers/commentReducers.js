import _ from 'lodash';
import constants from 'containers/UserPagesContainer/constants';

export const initialState = [];

export function commentReducer(state = initialState, action) {
  switch (action.type) {
    case constants.COMMENT_CREATED:
      // return Object.assign({}, state,
      //   {
      //     comments: _.concat(state.comments, action.comment),
      //   }
      // );
      return _.concat(state.comments, action.comment);
    case constants.COMMENTS_FETCHED:
      // return Object.assign({}, state,
      //   {
      //     comments: action.comments,
      //   }
      // );
      return action.comments;
    case constants.COMMENT_EDITED:
      const filteredDecks = _.filter(state.comments, (value, index) => {
        return value.id !== action.commentId;
      })
      // return Object.assign({}, state,
      //   {
      //     comments: _.concat(filteredDecks, action.comment),
      //   }
      // );
      return _.concat(filteredDecks, action.comment);
    case constants.COMMENT_DELETED:
      // return Object.assign({}, state,
      //   {
      //     comments: _.filter(state.comments, (value, index) => {
      //       return value.id !== action.commentId;
      //     }),
      //   }
      // );
      return (
        _.filter(state.comments, (value, index) => {
          return value.id !== action.commentId;
        })
      );
    default:
      return state;
  }
};

export default commentReducer;
