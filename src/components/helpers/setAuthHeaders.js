import axios from 'axios';

export default function setAuthHeaders(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = localStorage.getItem('tokenData');
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
