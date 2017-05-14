import axios from 'axios';

export const api = {
  get: '',
  post: (url: string, data: object) => {
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
  getWithToken: (url: string, token: string) => {
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
  patchWithToken: (url: string, data: Object, token: string) => {
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
  postWithToken: (url: string, data: Object, token: string) => {
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
  deleteWithToken: (url: string, token: string) => {
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
