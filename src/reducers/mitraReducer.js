const initialState = {
  list: [],
  detail: {},
  loading: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_MITRA':
      return {
        loading: true
      };
    case 'GET_MITRA_ACTION':
      return {
        ...state,
        list: action.payload.data,
        loading: false
      };
    case 'GET_DETAIL_MITRA_ACTION':
      return {
        ...state,
        detail: action.payload.data,
        loading: false
      };
    default:
      return state;
  }
};
