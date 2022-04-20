import _ from "lodash";

export default (state = {
  data: {},
  predefined: [],
  predefinedEndpoint: null,
  fileUploadUrl: null,
  newFieldData: null,
  conditionableFields: [],
  order: 1,
  locals: [],
  theme: {},
  supportedLanguages: [],
  addLanguageSelect: ''
}, action) => {
  let data = _.cloneDeep(state.data);
  switch (action.type) {
    case 'CREATE_FIELD':
      return {
        ...state,
        newFieldData: action.payload.data
      };
    case 'UPDATE_FIELD':   
      let order = state.order;
      if(state.newFieldData) {
        if(data){
          if(!state.newFieldData.parentId){
            for(const index in data){
              if(action.payload.data.order <= data[index].order){
                data[index].order = data[index].order + 1;
              }
            }
          }
          
        }
        if(!state.newFieldData.parentId) order++;
      }
      let newUpdateData = {
        ...data,
        [action.payload.data.uuid]: action.payload.data
      };    
      return {
        ...state,
        data: newUpdateData,
        order: order,
        newFieldData: null
      };
    case 'DELETE_FIELD':
      let deleteData = _.cloneDeep(data);
      if(deleteData[action.payload.id].type === 'section'){
        for(let index in deleteData){
          if(deleteData[index].parentId === action.payload.id) delete deleteData[index];
        }
      }
      delete deleteData[action.payload.id];
      return {
        ...state,
        data: deleteData
      }
    case 'SET_PREDEFINED':
      return {
        ...state,
        predefined: action.payload.data
      }
    case 'SET_PREDEFINED_ENDPOINT':
      return {
        ...state,
        predefinedEndpoint: action.payload.data
      }
    case 'SET_FILE_UPLOAD_URL':
      return {
        ...state,
        fileUploadUrl: action.payload.data
      }
    case 'ADD_PREDEFINED_CATEGORY':
      let preCategories = _.cloneDeep(state.predefined);
      preCategories.push(action.payload.data);
      return {
        ...state,
        predefined: preCategories
      }
    case 'UPDATE_CATEGORY_OPTIONS':
      let predefined = _.cloneDeep(state.predefined);
      for(let i = 0; i < predefined.length; i++) {
        if(predefined[i].slug === action.payload.slug) {
          predefined[i].options = action.payload.options;
          break;
        }
      }

      return {
        ...state,
        predefined: predefined
      }
    case 'SET_INITIAL':
      return {
        ...state,
        data: action.payload.data
      }
    case 'DELETE_NEW_FIELD':
      return {
        ...state,
        newFieldData: null
      }
    case 'SET_ORDER':
      return {
        ...state,
        order: action.payload.data
      }
    case 'SET_CONDITIONABLE_FIELDS':
      return {
        ...state,
        conditionableFields: action.payload.data
      }
    case 'SET_LOCALS':
      return {
        ...state,
        locals: action.payload.data
      }
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload.data
      }
    case 'SET_ADD_LANGUAGE_SELECT':
      return {
        ...state,
        addLanguageSelect: action.payload.data
      }
    default:
      return state
  }
}
