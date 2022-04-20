export const enableFieldEdit = (id, operation) => dispatch => {
  dispatch({
    type: 'ENABLE_FIELD_EDIT',
    payload: {id, operation}
  })
}

export const disableFieldEdit = (id) => dispatch => {
  dispatch({
    type: 'DISABLE_FIELD_EDIT',
    payload: {id}
  })
}