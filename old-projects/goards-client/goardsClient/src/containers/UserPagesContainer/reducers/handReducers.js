import _ from 'lodash';
import constants from 'containers/UserPagesContainer/constants';

export const initialState = [];

export function handReducer(state = initialState, action) {
  switch (action.type) {
    case constants.HAND_CREATED:
      // return Object.assign({}, state,
      //   {
      //     hands: _.concat(state.hands, action.hand),
      //   }
      // );
      return _.concat(state.hands, action.hand);
    case constants.HANDS_FETCHED:
      // return Object.assign({}, state,
      //   {
      //     hands: action.hands,
      //   }
      // );
      return action.hands;
    case constants.HAND_EDITED:
      const filteredDecks = _.filter(state.hands, (value, index) => {
        return value.id !== action.handId;
      })
      // return Object.assign({}, state,
      //   {
      //     hands: _.concat(filteredDecks, action.hand),
      //   }
      // );
      return _.concat(filteredDecks, action.hand);
    case constants.HAND_DELETED:
      // return Object.assign({}, state,
      //   {
      //     hands: _.filter(state.hands, (value, index) => {
      //       return value.id !== action.handId;
      //     }),
      //   }
      // );
      return (
        _.filter(state.hands, (value, index) => {
          return value.id !== action.handId;
        })
      );
    default:
      return state;
  }
};

export default handReducer;
