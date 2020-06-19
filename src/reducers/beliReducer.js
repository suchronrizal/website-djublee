const initialState = {
  listBankCredit: [],
  listBankLeasing: [],
  totalBankCalculation: [],
  responseCreditCard: [],
  responseBuyProduct: [],
  buySuccess: false,
  cardSuccess: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_DATA':
      return {
        loading: true
      };
    case 'GET_BANK_LEASING_LIST_ACTION':
      return {
        ...state,
        listBankLeasing: action.payload,
        loading: false
      };

    case 'GET_BANK_CREDIT_LIST_ACTION':
      return {
        ...state,
        listBankCredit: action.payload,
        loading: false
      };

    case 'GET_BANK_CREDIT_CALCULATION_ACTION':
      return {
        ...state,
        totalBankCalculation: action.payload,
        loading: false
      };

    case 'POST_USER_CREDIT_CARD':
      return {
        ...state,
        responseCreditCard: action.payload,
        loading: false,
        cardSuccess: true
      };

    case 'POST_BUY_PRODUCT_ACTION':
      return {
        ...state,
        responseBuyProduct: action.payload,
        buySuccess: true
      };

    default:
      return state;
  }
};
