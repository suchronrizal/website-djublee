const initialState = {
  jualResponse: [],
  listMyProduct: [],
  listMyBuylist: [],
  listMyTransaction: [],
  listMyBid: [],
  listBuyByType: [],
  listBidByType: [],
  loading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_TRANSACTION':
      return {
        loading: true,
        success: false
      };
    case 'GET_MY_PRODUCT_ACTION':
      return {
        ...state,
        listMyProduct: action.payload.data,
        loading: false
      };
    case 'GET_MY_BUYLIST_ACTION':
      return {
        ...state,
        listMyBuylist: action.payload.data,
        loading: false
      };
    case 'JUAL_ACTION':
      return {
        ...state,
        loading: false,
        success: true,
        jualResponse: action.payload
      };
    case 'GET_MY_TRANSACTION_ACTION':
      return {
        ...state,
        listMyTransaction: action.payload
      };
    case 'GET_MY_BIDLIST_ACTION':
      return {
        ...state,
        listMyBid: action.payload.data,
        loading: false
      };
    case 'GET_MY_BID_DETAIL_ACTION':
      return {
        ...state,
        listMyBidDetail: action.payload.data,
        loading: false
      };
    case 'GET_MY_BUY_AND_BIDDER':
      return {
        ...state,
        listMyBuyAndBidder: action.payload.data,
        loading: false
      };
    case 'LIST_BUY_BY_TYPE':
      return {
        ...state,
        listBuyByType: action.payload.data,
        loading: false
      };
    case 'LIST_BID_BY_TYPE':
      return {
        ...state,
        listBidByType: action.payload.data,
        loading: false
      };
    default:
      return state;
  }
};
