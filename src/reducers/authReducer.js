const initialState = {
  tokenData: {},
  userLogin: {},
  isSigedIn: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_DATA':
      return {
        loading: true
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isSigedIn: true,
        loading: false,
        userLogin: action.payload.user
      };
    case 'REGISTER_ACTION':
      return {
        ...state,
        tokenData: action.payload
      };

    case 'LOGIN_REGISTER_FB_ACTION':
      return {
        ...state,
        tokenData: action.payload
      };

    default:
      return state;
  }
};
