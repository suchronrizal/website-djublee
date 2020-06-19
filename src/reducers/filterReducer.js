const initialState = {
  byMerk: '',
  byGroupModel: '',
  byModel: '',
  byWilayah: '',
  byFilterPriceMin: '',
  byFilterPriceMax: '',
  byFilterKmMin: '',
  byFilterKmMax: '',
  byFilterYearMin: '',
  byFilterYearMax: '',
  byFilter: false,
  showFilterModal: false,
  brand: [],
  merk: [],
  model: [],
  wilayah: [],
  loading: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_REQUEST':
      return {
        loading: true
      };
    case 'FILTER_BY_MERK':
      return {
        ...state,
        byMerk: action.payload,
        byFilter: true
      };
    case 'FILTER_BY_GROUP_MODEL':
      return {
        ...state,
        byGroupModel: action.payload,
        byFilter: true
      };
    case 'FILTER_BY_MODEL':
      return {
        ...state,
        byModel: action.payload,
        byFilter: true
      };
    case 'FILTER_BY_WILAYAH':
      return {
        ...state,
        byWilayah: action.payload,
        byFilter: true
      };
    case 'SHOW_FILTER_ACTION':
      return {
        ...state,
        showFilterModal: action.payload
      };
    case 'GET_MERK':
      return {
        ...state,
        merk: action.payload.data
      };
    case 'GET_BRAND':
      return {
        ...state,
        brand: action.payload.data
      };
    case 'GET_TYPE':
      return {
        ...state,
        model: action.payload.data
      };
    case 'GET_WILAYAH':
      return {
        ...state,
        wilayah: action.payload.data,
        loading: false
      };
    default:
      return state;
  }
};
