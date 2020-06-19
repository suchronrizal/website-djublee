const initialState = {
  byName: 1
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'PAGINATION_BY_NAME_ACTION':
      return {
        ...state,
        byName: action.payload
      };
    default:
      return state;
  }
};
