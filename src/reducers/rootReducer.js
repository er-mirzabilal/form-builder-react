import { combineReducers } from 'redux';
import toolbarReducer from './toolbarReducer';
import formReducer from "./formReducer";
export default combineReducers({
  toolbar: toolbarReducer,
  form: formReducer
});