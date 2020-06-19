import axios from 'axios';
import { apiProduct } from '../components/helpers/api';

export const requestData = () => dispatch => {
  dispatch({
    type: 'REQUEST_PRODUCT'
  });
};

export const getProductByBidCountAction = () => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiProduct.listByListingCount
  })
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_BY_BID_COUNT_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProductLuxuryCarsAction = () => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiProduct.listLuxuryCars
  })
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_LUXURY_CARS_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProductSuperCarsAction = () => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiProduct.listSuperCars
  })
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_SUPER_CARS_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// SEARCH BY NAME
export const getProductSearchGroupByNameAction = param => dispatch => {
  axios({
    method: 'get',
    url: apiProduct.listSearchGroupByName + param
  })
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_SEARCH_GROUP_BY_NAME_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Get Product By Id
export const getProductByIdAction = id => dispatch => {
  dispatch(requestData());
  axios
    .get(apiProduct.productById + id)
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_BY_ID_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Get List Produk by Id Mitra
export const getProductByIdMitraAction = id => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiProduct.listProductByMitra + id
  })
    .then(res => {
      // console.log('apiProduct.listproductbymitra + id', apiProduct.listProductByMitra + id);
      // console.log('res', res.data);
      const { data } = res;
      dispatch({
        type: 'GET_LIST_PRODUCT_BY_MITRA_ACTION',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Get Detail View Group Product By Various Parameter
export const getDetailViewProductByVariousParameter = p => dispatch => {
  axios({
    method: 'get',
    url: apiProduct.viewGroupDetail + p
  })
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: 'GET_DETAIL_VIEW_GROUP_PRODUCT_BY_VARIOUS_PARAMETER',
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// SEARCH BY PARAMS
export const getProductSearchGroupByParamsAction = param => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiProduct.listSearchGroupByParams + param
  })
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_SEARCH_GROUP_BY_PARAMS_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Get View Group Product By Various Parameter
export const getViewProductByVariousParameter = param => dispatch => {
  dispatch(requestData());
  axios({
    method: 'get',
    url: apiProduct.viewGroup + param
  })
    .then(res => {
      dispatch({
        type: 'GET_VIEW_GROUP_PRODUCT_BY_VARIOUS_PARAMETER',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProductBrandAction = () => dispatch => {
  axios({
    method: 'get',
    url: apiProduct.brand
  })
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_BRAND_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProductMerkAction = param => dispatch => {
  axios({
    method: 'get',
    url: apiProduct.merk + param
  })
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_MERK_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProductModelAction = param => dispatch => {
  axios({
    method: 'get',
    url: apiProduct.model + param
  })
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_MODEL_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProductExteriorColorAction = () => dispatch => {
  axios({
    method: 'get',
    url: apiProduct.color
  })
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_EXTERIOR_COLOR_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProductInteriorColorAction = () => dispatch => {
  axios({
    method: 'get',
    url: apiProduct.color
  })
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_INTERIOR_COLOR_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProductWilayahAction = () => dispatch => {
  axios({
    method: 'get',
    url: apiProduct.wilayah
  })
    .then(res => {
      dispatch({
        type: 'GET_PRODUCT_WILAYAH_ACTION',
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
