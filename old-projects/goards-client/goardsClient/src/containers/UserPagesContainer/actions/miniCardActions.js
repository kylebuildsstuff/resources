import constants from '../constants'

// /////////////////////////////////////////////////////////
// MiniCards ==================================================
// ///////////////////////////////////////////////////////
export function createMiniCard(token) {
  return {
    type: constants.MINICARD_CREATE_REQUEST,
    token: token,
  }
}

export function fetchMiniCards(token) {
  return {
    type: constants.MINICARDS_FETCH_REQUEST,
    token: token,
  };
}

export function editMiniCard(miniCardId, formSubmitData, token) {
  return {
    type: constants.MINICARD_EDIT_REQUEST,
    miniCardId: miniCardId,
    formSubmitData: formSubmitData,
    token: token,
  };
}

export function deleteMiniCard(miniCardId, token) {
  return {
    type: constants.MINICARD_DELETE_REQUEST,
    miniCardId: miniCardId,
    token: token,
  };
}

export function broadcastMiniCardCreated(miniCard) {
  return {
    type: constants.MINICARD_CREATED,
    miniCard: miniCard,
  };
}

export function broadcastMiniCardsFetched(miniCards) {
  return {
    type: constants.MINICARDS_FETCHED,
    miniCards: miniCards,
  };
}

export function broadcastMiniCardEdited(miniCardId, miniCard) {
  return {
    type: constants.MINICARD_EDITED,
    miniCardId: miniCardId,
    miniCard: miniCard,
  };
};

export function broadcastMiniCardDeleted(miniCardId) {
  return {
    type: constants.MINICARD_DELETED,
    miniCardId: miniCardId,
  };
}
