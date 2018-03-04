import { combineReducers } from 'redux';

import deckReducer from 'containers/UserPagesContainer/reducers/deckReducers'
import handReducer from 'containers/UserPagesContainer/reducers/handReducers'
import cardReducer from 'containers/UserPagesContainer/reducers/cardReducers'
import miniCardReducer from 'containers/UserPagesContainer/reducers/miniCardReducers'
import commentReducer from 'containers/UserPagesContainer/reducers/commentReducers'
import userReducer from 'containers/UserPagesContainer/reducers/userReducers'

export function userPagesReducer(state, action) {
  return (
    combineReducers({
      decks: deckReducer,
      hands: handReducer,
      cards: cardReducer,
      miniCards: miniCardReducer,
      comments: commentReducer,
      user: userReducer,
    })(state, action)
  );
}

export default userPagesReducer;
