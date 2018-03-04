import constants from '../constants'

export function createCard(token) {
  return {
    type: constants.CARD_CREATE_REQUEST,
    token: token,
  }
}

export function fetchCards(token) {
  return {
    type: constants.CARDS_FETCH_REQUEST,
    token: token,
  };
}

export function editCard(cardId, formSubmitData, token) {
  return {
    type: constants.CARD_EDIT_REQUEST,
    cardId: cardId,
    formSubmitData: formSubmitData,
    token: token,
  };
}

export function deleteCard(cardId, token) {
  return {
    type: constants.CARD_DELETE_REQUEST,
    cardId: cardId,
    token: token,
  };
}

export function broadcastCardCreated(card) {
  return {
    type: constants.CARD_CREATED,
    card: card,
  };
}

export function broadcastCardsFetched(cards) {
  return {
    type: constants.CARDS_FETCHED,
    cards: cards,
  };
}

export function broadcastCardEdited(cardId, card) {
  return {
    type: constants.CARD_EDITED,
    cardId: cardId,
    card: card,
  };
};

export function broadcastCardDeleted(cardId) {
  return {
    type: constants.CARD_DELETED,
    cardId: cardId,
  };
}
