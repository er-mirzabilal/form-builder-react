export default (state = {}, action) => {
  switch (action.type) {
    case 'ENABLE_FIELD_EDIT':
      return {
        ...state,
        editId: action.payload.id,
      };
    case 'DISABLE_FIELD_EDIT':
      return {
        ...state,
        editId: null
      };
    default:
      return state
  }
}