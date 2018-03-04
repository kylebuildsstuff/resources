import _ from 'lodash';
import constants from 'containers/UserPagesContainer/constants';

export const initialState = [];

export function deckReducer(state = initialState, action) {
  switch (action.type) {
    case constants.DECK_CREATED:
      // return Object.assign({}, state,
      //   {
      //     decks: _.concat(state.decks, action.deck),
      //   }
      // );
      return _.concat(state.decks, action.deck);
    case constants.DECKS_FETCHED:
      // return Object.assign({}, state,
      //   {
      //     decks: action.decks,
      //   }
      // );
      return action.decks;
    case constants.DECK_EDITED:
      const filteredDecks = _.filter(state.decks, (value, index) => {
        return value.id !== action.deckId;
      });
      // return Object.assign({}, state,
      //   {
      //     decks: _.concat(filteredDecks, action.deck),
      //   }
      // );
      return _.concat(filteredDecks, action.deck);
    case constants.DECK_DELETED:
      // return Object.assign({}, state,
      //   {
      //     decks: _.filter(state.decks, (value, index) => {
      //       return value.id !== action.deckId;
      //     }),
      //   }
      // );
      return (
        _.filter(state.decks, (value, index) => {
          return value.id !== action.deckId;
        })
      );
    default:
      return state;
  }
};

export default deckReducer;
