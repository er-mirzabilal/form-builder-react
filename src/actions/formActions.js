export const createField = (data) => dispatch => {
  dispatch({
    type: 'CREATE_FIELD',
    payload: {data}
  })
}

export const deleteField = (id) => dispatch => {
  dispatch({
    type: 'DELETE_FIELD',
    payload: {id}
  })
}

export const updateField = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_FIELD',
    payload: {data}
  })
}

export const setPredefinedValues = (data) => dispatch => {
  dispatch({
    type: 'SET_PREDEFINED',
    payload: {data}
  })
}

export const setPredefinedEndpoint = (data) => dispatch => {
  dispatch({
    type: 'SET_PREDEFINED_ENDPOINT',
    payload: {data}
  })
}

export const setFileUploadUrl = (data) => dispatch => {
  dispatch({
    type: 'SET_FILE_UPLOAD_URL',
    payload: {data}
  })
}

export const setInitialData = (data) => dispatch => {
  dispatch({
    type: 'SET_INITIAL',
    payload: {data}
  })
}

export const setConditionableFields = (data) => dispatch => {
  dispatch({
    type: 'SET_CONDITIONABLE_FIELDS',
    payload: {data}
  })
}

export const deleteNewField = () => dispatch => {
  dispatch({
    type: 'DELETE_NEW_FIELD',
    payload: {}
  })
}

export const setOrder = (data) => dispatch => {
  dispatch({
    type: 'SET_ORDER',
    payload: {data}
  })
}

export const setLocals = (data) => dispatch => {
  dispatch({
    type: 'SET_LOCALS',
    payload: {data}
  })
}

export const setTheme = (data) => dispatch => {
  dispatch({
    type: 'SET_THEME',
    payload: {data}
  })
}

export const setAddLanguageSelect = (data) => dispatch => {
  dispatch({
    type: 'SET_ADD_LANGUAGE_SELECT',
    payload: {data}
  })
}