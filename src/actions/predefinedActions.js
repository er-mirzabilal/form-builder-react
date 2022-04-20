export const addCategory = (data) => dispatch => {
  dispatch({
    type: 'ADD_PREDEFINED_CATEGORY',
    payload: {data}
  })
}

export const updateCategoryOptions = (options, slug) => dispatch => {
  console.log('updateCategoryOptions', options, slug);
  dispatch({
    type: 'UPDATE_CATEGORY_OPTIONS',
    payload: {slug, options}
  });
  return Promise.resolve();
}