import axios from 'axios';
import moment from 'moment';
import { apiProfile } from '../components/helpers/api';

export const requestData = () => dispatch => {
  dispatch({
    type: 'REQUEST_DATA'
  });
};
export function getMyProfileAction() {
  return dispatch => {
    dispatch(requestData());
    axios
      .get(apiProfile.myProfile)
      .then(res => {
        dispatch({
          type: 'GET_PROFILE_ACTION',
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getMyProfileDataAction() {
  return dispatch => {
    axios
      .get(apiProfile.myProfile)
      .then(res => {
        dispatch({
          type: 'GET_PROFILE_DATA_ACTION',
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export const postMyProfileUserAction = data => dispatch => {
  const expCC = moment(data.expCreditCard).format('MM/YY');
  axios({
    method: 'put',
    url: apiProfile.putUserDashboard,
    data: {
      name: data.userName,
      email: data.email,
      phone: data.phone,
      address: data.mainAddress,
      other_address: data.secondAddress,
      no_kk: data.noCreditCard,
      tgl_kk: expCC,
      cvv_kk: data.cvv,
      old_password: data.oldPassword,
      password: data.newPassword,
      confirm_password: data.confirmNewPassword
    }
  })
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: 'POST_PROFILE_DATA_ACTION',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const postMyProfileCCardAction = (token, data) => dispatch => {
  const { id } = data.id;
  const expCC = data.expCreditCard;
  const dateCC = expCC._i.split('/');
  axios({
    method: 'post',
    url: apiProfile.myCreditCard + id,
    headers: {
      Authorization: token
    },
    data: {
      card_number: data.noCreditCard,
      month: dateCC[1],
      year: dateCC[2],
      cvv: data.cvv
    }
  })
    .then(res => {
      const { data } = res.data.data;
      dispatch({
        type: 'GET_PROFILE_DATA_ACTION',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const postMyProfilePasswordAction = (token, data) => dispatch => {
  const { id } = data.id;
  axios({
    method: 'post',
    url: apiProfile.myPassword + id,
    headers: {
      Authorization: token
    },
    data: {
      old_password: data.oldPassword,
      password: data.newPassword
    }
  })
    .then(res => {
      const { data } = res.data.data;
      dispatch({
        type: 'GET_PROFILE_DATA_ACTION',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
