const initialState = {
  jualResponse: [],
  listMyProduct: [],
  listMyBuylist: [],
  listMyBid: [],
  listMyTransaction: [],
  listMyBidDetail: [],
  success: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'JUAL_ACTION':
      return {
        ...state,
        jualResponse: action.payload,
        success: true
      };

    case 'GET_MY_PRODUCT_ACTION':
      return {
        ...state,
        listMyProduct: action.payload.data
      };
    case 'GET_MY_BUYLIST_ACTION':
      return {
        ...state,
        listMyBuylist: action.payload.data
      };

    case 'GET_MY_BIDLIST_ACTION':
      return {
        ...state,
        listMyBid: action.payload
      };

    case 'GET_MY_BID_DETAIL_ACTION':
      return {
        ...state,
        listMyBidDetail: action.payload
      };

    case 'GET_MY_TRANSACTION_ACTION':
      return {
        ...state,
        listMyTransaction: action.payload
      };
    default:
      return state;
  }
};
