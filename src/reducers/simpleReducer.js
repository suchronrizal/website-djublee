export default (state = {}, action) => {
  switch(action.type) {
    case 'SIMPLE_ACTION':
      return {
        ...state,
        result: action.payload
      }
    
    case 'ANOTHER_ACTION':
      return {
        ...state,
        result: action.payload
      }

    default:
      return state;
  }
}