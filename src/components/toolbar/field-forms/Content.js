import React from 'react';
import ValidateField from "../../../utils/validations/ValidateField";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import {disableFieldEdit} from "../../../actions/toolbarActions";
import { createField, deleteField, deleteNewField, updateField, setAddLanguageSelect } from '../../../actions/formActions';
import {connect} from "react-redux";
import RichTextEditor from "../../../utils/rich-text-editor";
import {InputLabel} from "@material-ui/core";
import { Scrollbars } from 'react-custom-scrollbars';
import { getHeight } from '../../../utils/helpers';
import { processLocalFields } from './utils/helpers';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  componentDidMount() {
    this.props.setAddLanguageSelect({target: {value: ''}});
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data.uuid !== this.state.uuid){
      this.setState({
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
    const {name, machineName, order, conditionalLogic, subType, uuid, type, content, visibility, parentId} = this.state;
    let newField = {name, machineName, order, uuid, type,parentId, config: {conditionalLogic, subType, content, visibility}};
    newField.locals = processLocalFields(this.props.locals, this.state);
    ValidateField(newField)
      .then(() => {
        this.props.updateField(newField);
        this.props.disableFieldEdit();
      }).catch((errors) => {
        this.setState({
          errors: errors
        })
    })
  }

  cancelEdit = () => {
    this.props.deleteNewField();
    this.props.disableFieldEdit();
  }

  render() {
    return (
      <div>
        <Scrollbars style={{height: getHeight(true, false)}} autoHide>
          {(this.props.locals && this.props.locals.length !== 0) && (
            <div className="ahfb-width-ful ahfb-px-3 ahfb-mt-3">
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <label className="ahfb-mt-3 ahfb-align-center">Add Language</label>
                </Grid>
                <Grid item xs={12} md={9}>
                  <FormControl className="ahfb-width-ful ahfb-d-flex">
                    <InputLabel id="demo-simple-select-label">Select language</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.props.addLanguageSelect}
                      onClick={this.props.setAddLanguageSelect}
                    >
                      {this.props.locals.map(locale => (
                        <MenuItem key={locale.key} value={locale.key}>{locale.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          )}
          <div className="ahfb-p-3 ahfb-my-3">
            <InputLabel>Content</InputLabel>
            <RichTextEditor data={this.state.content} handleChange={data => this.handleDataChange(data, 'content')} error={this.state.errors.content}/>
            {this.props.addLanguageSelect ? 
              <div className="ahfb-my-3">
                <InputLabel>Content in {this.props.locals.find(local => local.key === this.props.addLanguageSelect)?.name}</InputLabel>
                <RichTextEditor data={this.state.content_ar} handleChange={data => this.handleDataChange(data, `content_${this.props.addLanguageSelect}`)} error={this.state.errors.content}/>
              </div>
              :
              ''
            }
            <div className="ahfb-width-full ahfb-text-right ahfb-mt-3">
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
  locals: state.form.locals,
  addLanguageSelect: state.form.addLanguageSelect
})

const mapDispatchToProps = dispatch => ({
  disableFieldEdit: () => dispatch(disableFieldEdit()),
  deleteNewField: () => dispatch(deleteNewField()),
  createField: (data) => dispatch(createField(data)),
  updateField: (data) => dispatch(updateField(data)),
  deleteField: (id) => dispatch(deleteField(id)),
  setAddLanguageSelect: (e) => dispatch(setAddLanguageSelect(e.target.value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Content);