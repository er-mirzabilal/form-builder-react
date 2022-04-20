import React from 'react';
import ValidateField from "../../../utils/validations/ValidateField";
import Button from "@material-ui/core/Button";
import {disableFieldEdit} from "../../../actions/toolbarActions";
import { createField, deleteField, deleteNewField, updateField } from '../../../actions/formActions'
import {connect} from "react-redux";
import FileUpload from "../../../utils/file-upload";
import TextInput from "../../../utils/inputs/TextInput";
import { Scrollbars } from 'react-custom-scrollbars'
import FormHelperText from '@material-ui/core/FormHelperText'
import { getHeight } from '../../../utils/helpers'
import { processLocalFields } from './utils/helpers'
import { selectFieldsConfigs } from './utils/selectFieldConfigs'
import FieldRenderer from './utils/FieldRenderer'
import { imageFieldsConfigs } from './utils/imageFieldConfigs'

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      errors: {},
      uuid: props.data.uuid,
      name: props.data.name,
      type: props.data.type,
      order: props.data.order,
      parentId: props.data.parentId,
      machineName: props.data.machineName,
      ...props.data.config
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data.uuid !== this.state.uuid){
      this.setState({
          uploading: false,
          errors: {},
          uuid: nextProps.data.uuid,
          name: nextProps.data.name,
          type: nextProps.data.type,
          order: nextProps.data.order,
          parentId: nextProps.data.parentId,
          machineName: nextProps.data.machineName,
          ...nextProps.data.config
        }
      );
    }
  }
  handleDataChange = (val, name) => {
    this.setState({
      [name]: val,
      errors: {}
    })
  }

  saveField = () => {
    const {name, machineName, order, subType, uuid, type, url, href, tooltip, visibility,parentId} = this.state;
    let newField = {name, machineName, order, uuid, type,parentId, config: {subType, url, href, tooltip, visibility}};
    newField.locals = processLocalFields(this.props.locals, this.state);
    ValidateField(newField)
      .then(() => {
        this.props.updateField(newField);
        this.props.disableFieldEdit();
      }).catch((err) => {
      this.setState({
        errors: err
      })
    })
  }

  cancelEdit = () => {
    this.props.deleteNewField();
    this.props.disableFieldEdit();
  }

  renderFields = () => {
    return (
      <div>
        <div className="ahfb-mb-4">
          <TextInput label="Url" value={this.state.url} handleChange={e => this.handleDataChange(e.target.value, 'url')} autoFocus error={this.state.errors.url}/>
        </div>
        <div className="ahfb-separator ahfb-mb-4"><span>OR</span></div>
        <div className="ahfb-mb-4">
          <FileUpload label="File Upload" fileUploadUrl={this.props.fileUploadUrl} url={this.state.url} updateUrl={url => this.handleDataChange(url, 'url')} variant="images" uploadable={true}/>
          {(this.state.errors.upload) ? (
            <FormHelperText error>{this.state.errors.upload}</FormHelperText>
          ) : ""}
        </div>
        <FieldRenderer
          {...this.state}
          locals={this.props.locals}
          fieldConfigs={imageFieldsConfigs}
          handleDataChange={this.handleDataChange}
        />
        {/*<div className="ahfb-mb-4">*/}
        {/*  <TextInput label="Link on image" value={this.state.href} handleChange={e => this.handleDataChange(e.target.value, 'href')}/>*/}
        {/*</div>*/}
        {/*<div className="ahfb-mb-4">*/}
        {/*  <TextInput label="Tooltip on image" value={this.state.tooltip} handleChange={e => this.handleDataChange(e.target.value, 'tooltip')}/>*/}
        {/*</div>*/}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Scrollbars style={{height: getHeight(true, false)}} autoHide>
          <div className="ahfb-p-3 ahfb-my-3">
            {this.renderFields()}
            <div className="ahfb-width-full ahfb-text-right">
              <Button variant="outlined" color="primary" className="ahfb-mr-2" onClick={this.cancelEdit}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" disableElevation onClick={this.saveField}>
                Save
              </Button>
            </div>
          </div>
        </Scrollbars>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  operation: state.toolbar.operation,
  fileUploadUrl: state.form.fileUploadUrl,
  locals: state.form.locals
})

const mapDispatchToProps = dispatch => ({
  disableFieldEdit: () => dispatch(disableFieldEdit()),
  deleteNewField: () => dispatch(deleteNewField()),
  createField: (data) => dispatch(createField(data)),
  updateField: (data) => dispatch(updateField(data)),
  deleteField: (id) => dispatch(deleteField(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Image);