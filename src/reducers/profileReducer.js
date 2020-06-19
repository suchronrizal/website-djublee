const initialState = {
  userData: {},
  myUserData: {},
  myUserDataStatus: {},
  success: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_DATA':
      return {
        success: false
      };
    case 'GET_PROFILE_ACTION':
      return {
        ...state,
        userData: action.payload,
        success: true
      };
    case 'GET_PROFILE_DATA_ACTION':
      return {
        ...state,
        myUserData: action.payload.data,
        success: true
      };
    case 'POST_PROFILE_DATA_ACTION':
      return {
        ...state,
        myUserDataStatus: action.payload,
        success: true
      };
    default:
      return state;
  }
};
