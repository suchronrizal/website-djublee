import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { apiAuth } from '../components/helpers/api';
import setAuthHeaders from '../components/helpers/setAuthHeaders';

export const setcurrentUser = decodeToken => dispacth => {
  dispacth({
    type: 'SET_CURRENT_USER',
    payload: decodeToken
  });
};

export const loginAction = data => dispatch => {
  axios({
    method: 'post',
    url: apiAuth.login,
    data: {
      email: data.email,
      password: data.password
    }
  })
    .then(res => {
      const { token, exp } = res.data;
      localStorage.setItem('tokenData', token);
      localStorage.setItem('exp', exp);
      setAuthHeaders(token);
      const decodeToken = jwtDecode(token);
      dispatch(setcurrentUser(decodeToken));
    })
    .catch(err => {
      console.log(err);
    });
};

export const registerAction = data => dispatch => {
  axios({
    method: 'post',
    url: apiAuth.register,
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password
    }
  })
    .then(res => {
      // console.log('login res', res);
      const { data } = res.data;
      dispatch({
        type: 'REGISTER_ACTION',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const loginRegisterFBAction = accessToken => dispatch => {
  axios({
    method: 'post',
    url: apiAuth.loginRegisterFB,
    data: {
      token: accessToken
    }
  })
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: 'LOGIN_REGISTER_FB_ACTION',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const logoutAction = () => dispatch => {
  localStorage.removeItem('tokenData');
  setAuthHeaders(false);
  dispatch(setcurrentUser({}));
};
