import React from 'react'
import {createField, deleteField} from "../../actions/formActions";
import {enableFieldEdit, disableFieldEdit} from '../../actions/toolbarActions';
import {connect} from "react-redux";
import InputWrapper from './fields-wrappers/Input'

import DeleteIcon from '@material-ui/icons/Delete';
import CloneIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import {Tooltip} from "@material-ui/core";
import SelectWrapper from "./fields-wrappers/Select";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import CheckboxWrapper from "./fields-wrappers/Checkbox";
import RadioWrapper from "./fields-wrappers/Radio";
import DateWrapper from "./fields-wrappers/Date";
import ContentWrapper from "./fields-wrappers/Content";
import FileWrapper from "./fields-wrappers/File";
import SectionWrapper from "./fields-wrappers/Section";
import SignatureWrapper from "./fields-wrappers/Signature";
import ImageWrapper from "./fields-wrappers/Image";
import VideoWrapper from "./fields-wrappers/Video";
import {generateUUID} from "../../utils/helpers";
import {useWindowSize} from "../hooks/useWindowSize";
import _ from "lodash";

function FieldWrapper(props) {
  const [options, setOptions] = React.useState(false);
  const { width } = useWindowSize();

  const enableEdit = (e) => {
    props.enableFieldEdit(props.data.uuid);
  }

  const removeField = (e) => {
    if(props.editId === props.data.uuid) {
      props.disableFieldEdit();
    }
    props.deleteField(props.data.uuid);
  }

  const cloneField = (e) => {
    let uuid = generateUUID();
    let machineName = props.data.type + '-' + Math.round(Date.now()/1000);
    let newData = _.cloneDeep(props.data);
    newData.uuid = uuid;
    newData.machineName = machineName;
    props.createField(newData);
  }

  const showOptions = () => {
    setOptions(true);
  }

  const hideOptions = () => {
    setOptions(false);
  }

  const renderFields=(predefined)=>{
    switch(props.data.type) {
      case 'text' :
        return (<InputWrapper data={props.data}/>)
      case 'checkbox' :
        return (<CheckboxWrapper data={props.data} predefined={predefined}/>)
      case 'radio' :
        return (<RadioWrapper data={props.data} predefined={predefined}/>)
      case 'select':
        return (<SelectWrapper data={props.data} predefined={predefined}/>)
      case 'content':
        return (<ContentWrapper data={props.data}/>)
      case 'date':
        return (<DateWrapper data={props.data}/>)
      case 'file':
        return (<FileWrapper data={props.data}/>)
      case 'image':
        return (<ImageWrapper data={props.data}/>)
      case 'list':
        return (<h1>list</h1>)
      case 'quiz':
        return (<h1>quiz</h1>)
      case 'signature':
        return (<SignatureWrapper data={props.data}/>)
      case 'survey':
        return (<h1>survey</h1>)
      case 'video':
        return (<VideoWrapper data={props.data}/>)
      case 'section':
        return (<SectionWrapper data={props.data}/>)
      default:
        return (
          <div> Default </div>
        )
    }
  }
  let className = "wrapper ahfb-shadow-1 ahfb-bg-white ahfb-ml-3 ahfb-mr-3 ahfb-p-3 ahfb-relative";
  if(props.first) {
    className = className + ' first-field';
  }
  if(props.last) {
    className = className + ' last-field';
  }
  let predefined = {};
  props.predefined.map((item) => {
    predefined[item.id] = item;
  });
  return (
    <div>
      {(props.data.name || props.data.type === 'content' || props.data.type === 'image' || props.data.type === 'video')?
        <div className={className} onMouseOver={showOptions} onMouseLeave={hideOptions}>
          <div className="innerWrapper" style={{ marginTop: width < 450 ? '30px' : '' }}>
            {(options) ? (
              <ButtonGroup className={`options-menu ahfb-absolute ahfb-${props.theme.direction ? props.theme.direction : 'ltr'}-1 ahfb-top-1 ahfb-float-right ahfb-zIndex`} color="primary" size="small" aria-label="outlined primary button group">
                <Button className="delete-icon" onClick={removeField}>
                  <DeleteIcon fontSize="small" color="action"/>
                </Button>
                <Button className="edit-icon" onClick={enableEdit}>
                  <EditIcon fontSize="small" color="action"/>
                </Button>
                {(props.data.type !== 'section')?
                  <Button className="clone-icon" onClick={cloneField}>
                  <Tooltip title="Clone field">
                    <CloneIcon fontSize="small" color="action"/>
                  </Tooltip>
                  </Button>:''
                }
              </ButtonGroup>
            ) : ""}
            {renderFields(predefined)}
          </div>
        </div>
        : "" }
    </div>
  )
}
const mapStateToProps = state => ({
  editId: state.toolbar.editId,
  predefined: state.form.predefined,
  theme: state.form.theme,
})
  
  const mapDispatchToProps = dispatch => ({
    createField: (id) => dispatch(createField(id)),
    deleteField: (id) => dispatch(deleteField(id)),
    enableFieldEdit: (id) => dispatch(enableFieldEdit(id)),
    disableFieldEdit: () => dispatch(disableFieldEdit())
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(FieldWrapper);
