const initialState = {
  listByBidCount: [],
  listLuxuryCars: [],
  listSuperCars: [],
  listBrand: [],
  listMerk: [],
  listModel: [],
  listById: [],
  listExteriorColor: [],
  listInteriorColor: [],
  listSearchGroupByName: [],
  listSearchGroupByParams: [],
  listViewProductByVariousParam: [],
  listProdukMitra: [],
  listWilayah: [],
  loading: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_PRODUCT':
      return {
        loading: true
      };
    case 'GET_PRODUCT_BY_ID_ACTION':
      return {
        ...state,
        listById: action.payload.data,
        loading: false
      };

    case 'GET_PRODUCT_BY_BID_COUNT_ACTION':
      return {
        ...state,
        listByBidCount: action.payload,
        loading: false
      };

    case 'GET_LIST_PRODUCT_BY_MITRA_ACTION':
      return {
        ...state,
        listProdukMitra: action.payload.data,
        loading: false
      };

    case 'GET_PRODUCT_LUXURY_CARS_ACTION':
      return {
        ...state,
        listLuxuryCars: action.payload,
        loading: false
      };

    case 'GET_VIEW_GROUP_PRODUCT_BY_VARIOUS_PARAMETER':
      return {
        ...state,
        listViewProductByVariousParam: action.payload,
        loading: false
      };

    case 'GET_DETAIL_VIEW_GROUP_PRODUCT_BY_VARIOUS_PARAMETER':
      return {
        ...state,
        listDetailViewGroupProduct: action.payload,
        loading: false
      };

    case 'GET_PRODUCT_SUPER_CARS_ACTION':
      return {
        ...state,
        listSuperCars: action.payload,
        loading: false
      };

    case 'GET_PRODUCT_SEARCH_GROUP_BY_NAME_ACTION':
      return {
        ...state,
        listSearchGroupByName: action.payload
      };

    case 'GET_PRODUCT_SEARCH_GROUP_BY_PARAMS_ACTION':
      return {
        ...state,
        listSearchGroupByParams: action.payload,
        loading: false
      };

    case 'GET_PRODUCT_BRAND_ACTION':
      return {
        ...state,
        listBrand: action.payload.data
      };

    case 'GET_PRODUCT_MERK_ACTION':
      return {
        ...state,
        listMerk: action.payload
      };

    case 'GET_PRODUCT_MODEL_ACTION':
      return {
        ...state,
        listModel: action.payload.data
      };

    case 'GET_PRODUCT_EXTERIOR_COLOR_ACTION':
      return {
        ...state,
        listExteriorColor: action.payload.data
      };

    case 'GET_PRODUCT_INTERIOR_COLOR_ACTION':
      return {
        ...state,
        listInteriorColor: action.payload.data
      };

    case 'GET_PRODUCT_WILAYAH_ACTION':
      return {
        ...state,
        listWilayah: action.payload.data
      };

    case 'GET_MY_PRODUCT_ACTION':
      return {
        ...state,
        listMyProduct: action.payload
      };

    default:
      return state;
  }
};
