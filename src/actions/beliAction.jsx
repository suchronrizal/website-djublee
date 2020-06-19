import axios from 'axios';
import { apiTransaksi } from '../components/helpers/api';

export const requestData = () => dispatch => {
  dispatch({
    type: 'REQUEST_DATA'
  });
};

export const getBankLeasingList = () => dispatch => {
  axios({
    method: 'get',
    url: apiTransaksi.bankLeasing
  })
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: 'GET_BANK_LEASING_LIST_ACTION',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getBankCreditList = id => dispatch => {
  axios({
    method: 'get',
    url: apiTransaksi.bankKredit + id
  })
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: 'GET_BANK_CREDIT_LIST_ACTION',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getBankCreditCalculation = (id, value) => dispatch => {
  axios({
    method: 'get',
    url: `${apiTransaksi.bankCalculation}id=${id}&credit_value=${value}`
  })
    .then(res => {
      // console.log('calculation', res.data);
      const { data } = res.data;
      dispatch({
        type: 'GET_BANK_CREDIT_CALCULATION_ACTION',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const postBuyProductAction = data => dispatch => {
  axios({
    method: 'post',
    url: apiTransaksi.buyProduct,
    data
  })
    .then(res => {
      dispatch({
        type: 'POST_BUY_PRODUCT_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const postUserCreditCard = (id, data) => dispatch => {
  axios({
    method: 'post',
    url: apiTransaksi.userCreditCard + id,
    data
  })
    .then(res => {
      dispatch({
        type: 'POST_USER_CREDIT_CARD',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
