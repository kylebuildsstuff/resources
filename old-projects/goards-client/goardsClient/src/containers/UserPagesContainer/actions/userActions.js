import constants from '../constants'

export function createUser(formSubmitData) {
  return {
    type: constants.USER_CREATE_REQUEST,
    formSubmitData: formSubmitData,
  };
}

export function fetchUser(userId, token) {
  return {
    type: constants.USER_FETCH_REQUEST,
    userId: userId,
    token: token,
  };
}

export function editUser(userId, formSubmitData, token) {
  return {
    type: constants.USER_EDIT_REQUEST,
    userId: userId,
    formSubmitData: formSubmitData,
    token: token,
  };
}

export function deleteUser(userId, token) {
  return {
    type: constants.USER_DELETED_REQUEST,
    userId: userId,
    token: token,
  };
}

export function broadcastUserCreated(user) {
  return {
    type: constants.USER_CREATED,
    user: user,
  };
}

export function broadcastUserFetched(user) {
  return {
    type: constants.USER_FETCHED,
    user: user,
  };
}

export function broadcastUserEdited(userId, user) {
  return {
    type: constants.USER_EDITED,
    userId: userId,
    user: user,
  };
};

export function broadcastUserDeleted(userId) {
  return {
    type: constants.USER_DELETED,
    userId: userId,
  };
}
