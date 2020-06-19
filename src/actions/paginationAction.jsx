export const searchByNameAction = currentPage => dispatch => {
  dispatch({
    type: 'PAGINATION_BY_NAME_ACTION',
    payload: currentPage
  });
};
