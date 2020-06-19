import axios from 'axios';
import { apiTransaksi } from '../components/helpers/api';

export const requestData = () => dispatch => {
  dispatch({
    type: 'REQUEST_TRANSACTION'
  });
};
export const jualAction = data => async dispatch => {
  dispatch(requestData());
  await axios({
    method: 'post',
    url: apiTransaksi.jual,
    data: {
      brand: data.merk,
      group_model: data.groupModel,
      model: data.model,
      kilometer: (data.kilometer && data.kilometer) || '',
      buy_year: (data.tahunPemakaian && data.tahunPemakaian) || '',
      build_year: data.tahunPembuatan,
      exterior_color: data.warnaEksterior,
      interior_color: data.warnaInterior,
      sell_price: data.hargaDiminta,
      buy_price: (data.hargaPembelian && data.hargaPembelian) || '',
      wilayah: data.lokasiMobil,
      no_rangka: (data.noRangka && data.noRangka) || '',
      no_stnk: (data.noStnk && data.noStnk) || '',
      product_condition: data.kondisi,
      image: data.piceksterior,
      deflect_image: data.picinterior,
      stnk_images: (data.picstnk && data.picstnk) || '',
      djublee_offer: data.djubleeOffer
    }
  })
    .then(res => {
      dispatch({
        type: 'JUAL_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getMyProductAction = () => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiTransaksi.myProduct
  })
    .then(res => {
      dispatch({
        type: 'GET_MY_PRODUCT_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getMyBuyAndBidder = () => dispatch => {
  axios.get(apiTransaksi.myBuyAndbid).then(res => {
    dispatch({
      type: 'GET_MY_BUY_AND_BIDDER',
      payload: res.data
    });
  });
};
export const getMyBuylistAction = () => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiTransaksi.myPembelian
  })
    .then(res => {
      dispatch({
        type: 'GET_MY_BUYLIST_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getMyBidAction = token => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiTransaksi.myBidList,
    headers: {
      Authorization: token
    }
  })
    .then(res => {
      dispatch({
        type: 'GET_MY_BIDLIST_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getMyTransAction = token => dispatch => {
  axios
    .get(apiTransaksi.myTransactionList, { headers: { Authorization: token } })
    .then(res => {
      const data = res.data.data;
      dispatch({
        type: 'GET_MY_TRANSACTION_ACTION',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getMyBidDetail = (token, id) => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiTransaksi.myDetailBid + id,
    headers: {
      Authorization: token
    }
  })
    .then(res => {
      dispatch({
        type: 'GET_MY_BID_DETAIL_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const listBuyByType = params => async dispatch => {
  await axios.get(apiTransaksi.listBuyByType + params).then(res => {
    dispatch({
      type: 'LIST_BUY_BY_TYPE',
      payload: res.data
    });
  });
};
export const listBidByType = params => async dispatch => {
  await axios.get(apiTransaksi.listBidByType + params).then(res => {
    dispatch({
      type: 'LIST_BID_BY_TYPE',
      payload: res.data
    });
  });
};
