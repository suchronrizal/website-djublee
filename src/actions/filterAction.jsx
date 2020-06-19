import axios from 'axios';
import { apiProduct } from '../components/helpers/api';

export const filterByMerk = merk => dispatch => {
  dispatch({
    type: 'FILTER_BY_MERK',
    payload: merk
  });
};
export const filterByGroupModel = groupModel => dispatch => {
  dispatch({
    type: 'FILTER_BY_GROUP_MODEL',
    payload: groupModel
  });
};
export const filterByModel = model => dispatch => {
  dispatch({
    type: 'FILTER_BY_MODEL',
    payload: model
  });
};
export const filterByWilayah = wil => dispatch => {
  dispatch({
    type: 'FILTER_BY_WILAYAH',
    payload: wil
  });
};

export const showFilter = param => dispatch => {
  dispatch({
    type: 'SHOW_FILTER_ACTION',
    payload: param
  });
};

export const showBrand = () => async dispatch => {
  await axios.get(apiProduct.brand).then(res => {
    dispatch({
      type: 'GET_BRAND',
      payload: res.data
    });
  });
};

export const showMerk = param => dispatch => {
  axios.get(`${apiProduct.merk + param}`).then(res => {
    dispatch({
      type: 'GET_MERK',
      payload: res.data
    });
  });
};

export const showType = param => dispatch => {
  axios.get(`${apiProduct.model + param}`).then(res => {
    dispatch({
      type: 'GET_TYPE',
      payload: res.data
    });
  });
};
export const showWilayah = () => dispatch => {
  axios.get(`${apiProduct.wilayah}?name=KOTA`).then(res => {
    dispatch({
      type: 'GET_WILAYAH',
      payload: res.data
    });
  });
};
