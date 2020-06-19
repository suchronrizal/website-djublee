import axios from 'axios';
import { apiMitra } from '../components/helpers/api';

export const requestData = () => dispatch => {
  dispatch({
    type: 'REQUEST_MITRA'
  });
};
export const getMitraAction = () => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiMitra.list
  })
    .then(res => {
      dispatch({
        type: 'GET_MITRA_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getDetailMitraAction = idMitra => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiMitra.detailMitra + idMitra
  })
    .then(res => {
      const { data } = res;
      dispatch({
        type: 'GET_DETAIL_MITRA_ACTION',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
