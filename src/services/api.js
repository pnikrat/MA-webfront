import axios from 'axios';
import { GET, POST, PUT, DELETE } from '../state/constants';

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

function get(url, params = {}) {
  instance.defaults.headers = setHeaders();
  return instance.get(url, params);
}

function post(url, data) {
  const body = JSON.stringify(data);
  instance.defaults.headers = setHeaders();
  return instance.post(url, body);
}

function put(url, data) {
  const body = JSON.stringify(data);
  instance.defaults.headers = setHeaders();
  return instance.put(url, body);
}

// delete is JS reserved word
function apiDelete(url) {
  instance.defaults.headers = setHeaders();
  return instance.delete(url);
}

function call(payload) {
  const { url, method, data } = payload;
  switch (method) {
    case GET:
      return get(url);
    case POST:
      return post(url, data);
    case PUT:
      return put(url, data);
    case DELETE:
      return apiDelete(url);
    default:
      return Promise.reject();
  }
}

export default call;
