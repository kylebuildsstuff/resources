/* eslint-disable */
import axios from 'axios';
import storage from 'local-storage-fallback';

const auth = {
  // get function
  get(url) {
    const token = storage.getItem('token');
    return axios({
      method: 'get',
      url,
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
  },

  // post function
  post(url, { ...data }) {
    return axios({
      method: 'post',
      url,
      data,
    })
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
  },

  // post with token function
  postWithToken(url, { ...data }) {
    const token = storage.getItem('token');
    return axios({
      method: 'post',
      url,
      data,
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
  },

  // token refresh or logout function
  init() {
    const token = storage.getItem('token');
    if (token) {
      return axios({
        method: 'post',
        url: '/api/auth/jwt/refresh/',
        data: { token },
      })
      .then((response) => {
        storage.setItem('token', response.data.content.token);
        return true;
      })
      .catch((error) => {
        return false;
      });
    }
    return false;
  },

  // health check call
  healthCheck() {
    return axios({
      method: 'get',
      url: '/api/healthcheck/',
    })
    .then((response) => {
      if (response.data.status_code > 200) {
        return false;
      }
      return true;
    })
    .catch((error) => {
      return false;
    });
  },

  // localStorage helpers

  setAuthToken(token) { storage.setItem('token', token) },
  getAuthToken() { return storage.getItem('token') },
  removeAuthToken() { return storage.removeItem('token') },

};

export default auth;
