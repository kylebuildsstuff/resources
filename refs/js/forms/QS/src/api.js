import axios from 'axios';
import storage from 'local-storage-fallback';

const api = {

  // post function
  post(url, data) {
    return axios({
      method: 'post',
      url,
      data: data.values,
    })
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
  },

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

  // get function
  getNoAuth(url) {
    return axios({
      method: 'get',
      url,
    })
    .then((response) => response.data)
    .catch((error) => {
      return error;
    });
  },

  // localStorage helpers
  setAuthToken(token) { storage.setItem('token', token) },
  getAuthToken() { return storage.getItem('token') },
  removeAuthToken() { return storage.removeItem('token') },

}

export default api;
