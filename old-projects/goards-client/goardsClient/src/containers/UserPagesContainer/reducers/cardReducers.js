import _ from 'lodash';
import constants from 'containers/UserPagesContainer/constants';

export const initialState = [];

export function cardReducer(state = initialState, action) {
  switch (action.type) {
    case constants.CARD_CREATED:
      // return Object.assign({}, state,
      //   {
      //     cards: _.concat(state.cards, action.card),
      //   }
      // );
      return _.concat(state.cards, action.card);
    case constants.CARDS_FETCHED:
      // return Object.assign({}, state,
      //   {
      //     cards: action.cards,
      //   }
      // );
      return action.cards;
    case constants.CARD_EDITED:
      const filteredDecks = _.filter(state.cards, (value, index) => {
        return value.id !== action.cardId;
      })
      // return Object.assign({}, state,
      //   {
      //     cards: _.concat(filteredDecks, action.card),
      //   }
      // );
      return _.concat(filteredDecks, action.card);
    case constants.CARD_DELETED:
      // return Object.assign({}, state,
      //   {
      //     cards: _.filter(state.cards, (value, index) => {
      //       return value.id !== action.cardId;
      //     }),
      //   }
      // );
      return (
        _.filter(state.cards, (value, index) => {
          return value.id !== action.cardId;
        })
      );
    default:
      return state;
  }
};

export default cardReducer;
