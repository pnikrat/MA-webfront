import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function setHeaders() {
  const token = localStorage.getItem('access-token');
  const uid = localStorage.getItem('uid');
  const client = localStorage.getItem('client');

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Token': `${token}`,
    'Token-Type': 'Bearer',
    uid: `${uid}`,
    client: `${client}`,
  };
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: setHeaders()
});

export default {
  get(url, params = {}) {
    instance.defaults.headers = setHeaders();
    return instance.get(url, params);
  },

  post(url, data) {
    const body = JSON.stringify(data);
    instance.defaults.headers = setHeaders();
    return instance.post(url, body);
  },

  put(url, data) {
    const body = JSON.stringify(data);
    instance.defaults.headers = setHeaders();
    return instance.put(url, body);
  },

  delete(url) {
    instance.defaults.headers = setHeaders();
    return instance.delete(url);
  }
};
