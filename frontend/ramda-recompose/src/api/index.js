import axios from 'axios';

export const api = (url) => (method) => {
  return (data = undefined) => {
    return (
      axios.request({
        url: url,
        method: method,
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
  }
}
