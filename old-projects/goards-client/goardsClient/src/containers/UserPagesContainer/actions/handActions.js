import constants from '../constants'

export function createHand(token) {
  return {
    type: constants.HAND_CREATE_REQUEST,
    token: token,
  }
}

export function fetchHands(token) {
  return {
    type: constants.HANDS_FETCH_REQUEST,
    token: token,
  };
}

export function editHand(handId, formSubmitData, token) {
  return {
    type: constants.HAND_EDIT_REQUEST,
    handId: handId,
    formSubmitData: formSubmitData,
    token: token,
  };
}

export function deleteHand(handId, token) {
  return {
    type: constants.HAND_DELETE_REQUEST,
    handId: handId,
    token: token,
  };
}

export function broadcastHandCreated(hand) {
  return {
    type: constants.HAND_CREATED,
    hand: hand,
  };
}

export function broadcastHandsFetched(hands) {
  return {
    type: constants.HANDS_FETCHED,
    hands: hands,
  };
}

export function broadcastHandEdited(handId, hand) {
  return {
    type: constants.HAND_EDITED,
    handId: handId,
    hand: hand,
  };
};

export function broadcastHandDeleted(handId) {
  return {
    type: constants.HAND_DELETED,
    handId: handId,
  };
}
