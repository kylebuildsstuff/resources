import axios from 'axios';
import * as actions from './types';

const ROOT_URL = `http://localhost:8000`;
const JWT_URL = `${ROOT_URL}/api-token-auth`;


export function createUser(credentials) {
  const request = axios.post(`${ROOT_URL}/api/users/`, credentials);
  return {
    type: actions.CREATE_USER,
    payload: request,
  };
}

export function createGoal(token) {
  const request = axios.post(`${ROOT_URL}/api/goals/`, {'jwt': JSON.parse(token)});
  return {
    type: actions.CREATE_GOAL,
    payload: request,
  }
}

export function editGoal(props, goal, token) {
  const request = axios.patch(`${goal.url}`, props, {
    headers: {
      'Authorization': `JWT ${token}`,
    }
  });
  return {
    type: actions.EDIT_GOAL,
    payload: request,
  }
}

export function fetchJWT(credentials) {
  const request = axios.post(`${JWT_URL}`, credentials);
  return {
    type: actions.FETCH_JWT,
    payload: request,
  };
}

export function fetchUser(userId) {
  const request = axios.get(`${ROOT_URL}/api/users/${userId}`);
  return {
    type: actions.FETCH_USER,
    payload: request,
  };
}

export function fetchUserGoals(goalUrl) {
  const request = axios.get(`${goalUrl}`);
  return {
    type: actions.FETCH_USER_GOALS,
    payload: request,
  };
}

export function deleteGoal(goal, token) {
  const request = axios.delete(`${goal.url}`, {
    headers: {
      'Authorization': `JWT ${token}`,
    }
  });
  return {
    type: actions.DELETE_GOAL,
    payload: goal.url,
  }
}

export function logoutUser() {
  return {
    type: actions.LOGOUT_USER,
  }
}
