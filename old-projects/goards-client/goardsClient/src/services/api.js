import axios from 'axios';

export const api = {
  get: '',
  post: (url, data) => {
    return (
      axios.request({
        url: url,
        method: 'post',
        data: data,
        responseType: 'json',
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        })
    );
  },
  getWithToken: (url, token) => {
    return (
      axios.request({
        url: url,
        method: 'get',
        responseType: 'json',
        headers: {
          'Authorization': `JWT ${token}`
        },
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        })
    );
  },
  patchWithToken: (url, data, token) => {
    return (
      axios.request({
        url: url,
        method: 'patch',
        data: data,
        responseType: 'json',
        headers: {
          'Authorization': `JWT ${token}`
        },
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        })
    );
  },
  postWithToken: (url, data, token) => {
    return (
      axios.request({
        url: url,
        method: 'post',
        data: data,
        responseType: 'json',
        headers: {
          'Authorization': `JWT ${token}`
        },
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        })
    );
  },
  deleteWithToken: (url, token) => {
    return (
      axios.request({
        url: url,
        method: 'delete',
        responseType: 'json',
        headers: {
          'Authorization': `JWT ${token}`
        },
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        })
    );
  }
};

export default api;
