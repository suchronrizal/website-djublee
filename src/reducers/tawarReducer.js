const initialState = {
  bankLeasing:[],
  bankKredit:[],
  loadingBankKredit: false,
  loading: false,
  success: false,
  error: false,
  errorMessages:''
}
export default (state = initialState, action) => {
  switch(action.type) {
    case 'LOADING_REQUEST':
      return{
        loading: true,
        success: false
      }
    case 'LOADING_BANK_KREDIT':
      return{
        loadingBankKredit: true,
        success: false
      }
    case 'BANK_LEASING':
      return{
        bankLeasing: action.payload.data,
        loading: false,
        success: false
      }
    case 'BANK_KREDIT':
      return{
        bankKredit: action.payload.data,
        loadingBankKredit: false,
        success: false
      }
    case 'CREATE_TAWAR':
      return {
        ...state,
        loading: false,
        success: true,
        error: false
      }
    case 'CHANGE_CREDITCARD':
      return {
        ...state,
        wilayah: action.payload.data,
        loading: false
      }
      case 'ERROR_MESSAGES':
        return {
          ...state,
          error: true,
          errorMessages: action.payload,
          loading: false,
          success: false
        }
    default:
      return state;
  }
}