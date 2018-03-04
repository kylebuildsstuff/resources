import _ from 'lodash';
import constants from 'containers/UserPagesContainer/constants';

export const initialState = [];

export function miniCardReducer(state = initialState, action) {
  switch (action.type) {
    case constants.MINICARD_CREATED:
      // return Object.assign({}, state,
      //   {
      //     miniCards: _.concat(state.miniCards, action.miniCard),
      //   }
      // );
      return _.concat(state.miniCards, action.miniCard);
    case constants.MINICARDS_FETCHED:
      // return Object.assign({}, state,
      //   {
      //     miniCards: action.miniCards,
      //   }
      // );
      return action.miniCards;
    case constants.MINICARD_EDITED:
      const filteredDecks = _.filter(state.miniCards, (value, index) => {
        return value.id !== action.miniCardId;
      })
      // return Object.assign({}, state,
      //   {
      //     miniCards: _.concat(filteredDecks, action.miniCard),
      //   }
      // );
      return _.concat(filteredDecks, action.miniCard);
    case constants.MINICARD_DELETED:
      // return Object.assign({}, state,
      //   {
      //     miniCards: _.filter(state.miniCards, (value, index) => {
      //       return value.id !== action.miniCardId;
      //     }),
      //   }
      // );
      return (
        _.filter(state.miniCards, (value, index) => {
          return value.id !== action.miniCardId;
        })
      );
    default:
      return state;
  }
};

export default miniCardReducer;
