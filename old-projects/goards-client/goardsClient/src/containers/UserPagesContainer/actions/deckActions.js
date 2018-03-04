import constants from '../constants';

export function createDeck(token) {
  return {
    type: constants.DECK_CREATE_REQUEST,
    token: token,
  }
}

export function fetchDecks(token) {
  return {
    type: constants.DECKS_FETCH_REQUEST,
    token: token,
  };
}

export function editDeck(deckId, formSubmitData, token) {
  return {
    type: constants.DECK_EDIT_REQUEST,
    deckId: deckId,
    formSubmitData: formSubmitData,
    token: token,
  };
}

export function deleteDeck(deckId, token) {
  return {
    type: constants.DECK_DELETE_REQUEST,
    deckId: deckId,
    token: token,
  };
}

export function broadcastDeckCreated(deck) {
  return {
    type: constants.DECK_CREATED,
    deck: deck,
  };
}

export function broadcastDecksFetched(decks) {
  return {
    type: constants.DECKS_FETCHED,
    decks: decks,
  };
}

export function broadcastDeckEdited(deckId, deck) {
  return {
    type: constants.DECK_EDITED,
    deckId: deckId,
    deck: deck,
  };
};

export function broadcastDeckDeleted(deckId) {
  return {
    type: constants.DECK_DELETED,
    deckId: deckId,
  };
}
