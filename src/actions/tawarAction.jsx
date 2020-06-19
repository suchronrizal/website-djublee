import axios from 'axios';
import { apiTransaksi, apiProfile } from '../components/helpers/api';

const token = localStorage.getItem('tokenData');

export const loadingRequest = () => dispatch => {
  dispatch({
    type: 'LOADING_REQUEST'
  });
};
export const loadingBankKredit = () => dispatch => {
  dispatch({
    type: 'LOADING_BANK_KREDIT'
  });
};
export const errorMessage = data => dispatch => {
  dispatch({
    type: 'ERROR_MESSAGES',
    payload: data
  });
};
export const createTawar = data => dispatch => {
  dispatch(loadingRequest());
  axios.defaults.headers.common = { Authorization: token };
  axios
    .post(`${apiTransaksi.tawar}`, data)
    .then(res => {
      if (res.data.status === 404) {
        dispatch(errorMessage(res.data.message));
      } else {
        dispatch({
          type: 'CREATE_TAWAR',
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch(errorMessage(err.response));
    });
};
export const bankLeasing = () => dispatch => {
  dispatch(loadingRequest());
  axios.defaults.headers.common = { Authorization: token };
  axios.get(`${apiTransaksi.bankLeasing}`).then(res => {
    dispatch({
      type: 'BANK_LEASING',
      payload: res.data
    });
  });
};
export const bankKredit = idLeasing => dispatch => {
  dispatch(loadingBankKredit());
  axios.defaults.headers.common = { Authorization: token };
  axios.get(`${apiTransaksi.bankKredit}${idLeasing}`).then(res => {
    dispatch({
      type: 'BANK_KREDIT',
      payload: res.data
    });
  });
};
export const changeCC = () => dispatch => {
  dispatch(loadingRequest());
  axios.defaults.headers.common = { Authorization: token };
  axios.post(`${apiProfile.myCreditCard}`).then(res => {
    dispatch({
      type: 'CHANGE_CC',
      payload: res.data
    });
  });
};
