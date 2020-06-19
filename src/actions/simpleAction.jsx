export const simpleAction = () => dispatch => {
  dispatch({
    type: 'SIMPLE_ACTION',
    payload: 'result_of_simple_action'
  });
};

export const anotherAction = () => dispatch => {
  dispatch({
    type: 'ANOTHER_ACTION',
    payload: 'result_of_another_action'
  });
};
