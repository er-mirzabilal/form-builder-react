import React from 'react';
import SimpleTabs from "../../../utils/Tabs/SimpleTabs";
import TextInput from "../../../utils/inputs/TextInput";
import Checkbox from "../../../utils/checkboxs/Checkbox";
import SearchableSelect from "../../../utils/selects/SearchableSelect";
import ValidateField from "../../../utils/validations/ValidateField";
import Button from "@material-ui/core/Button";
import {disableFieldEdit} from "../../../actions/toolbarActions";
import {createField, deleteField, updateField, deleteNewField} from "../../../actions/formActions";
import {connect} from "react-redux";
import PredefinedValues from "../../../utils/predefined-values";
import ConditionalLogic from "../../../utils/conditional-logic";
import { Scrollbars } from 'react-custom-scrollbars';
import { getHeight } from '../../../utils/helpers';
import { textFieldsConfigs } from './utils/textFieldConfigs';
import FieldRenderer from './utils/FieldRenderer';
import { processLocalFields } from './utils/helpers';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'basic',
      errors: {},
      uuid: props.data.uuid,
      name: props.data.name,
      order: props.data.order,
      type: props.data.type,
      parentId: props.data.parentId,
      machineName: props.data.machineName,
      ...props.data.config,
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data.uuid !== this.state.uuid){
      this.setState({
        activeTab: 'basic',
        errors: {},
        uuid: nextProps.data.uuid,
        name: nextProps.data.name,
        order: nextProps.data.order,
        type: nextProps.data.type,
        parentId: nextProps.data.parentId,
        machineName: nextProps.data.machineName,
        ...nextProps.data.config,
      })
    }
  }

  handleTabChange = (e, newValue) => {
    this.setState({
      activeTab: newValue
    })
  }

  handleDataChange = (val, name) => {
    this.setState({
      [name]: val,
      errors: {}
    })
  }

  saveField = () => {
    const {name, machineName, order, conditionalLogic, isRequired, isRichText, maxLength, placeholder, helpText, subType, regex, visibility, uuid, type,parentId} = this.state;
    let newField = {name, machineName, order, uuid, type,parentId, config: {conditionalLogic, isConditionalEnabled:!!conditionalLogic.conditions.length, isRequired, isRichText, maxLength, placeholder, helpText, subType, regex, visibility}};

    newField.locals = processLocalFields(this.props.locals, this.state);

    ValidateField(newField, this.props.fields)
      .then(() => {
        this.props.updateField(newField);
        this.props.disableFieldEdit();
      }).catch((errors) => {
        let keys = Object.keys(errors);
        if(keys[0] === 'machineName' || keys[0] === 'conditionalLogic' || keys[0] === 'regex') {
          this.handleTabChange({}, 'advance');
        } else {
          this.handleTabChange({}, 'basic');
        }
        this.setState({
          errors: errors
        })
      })
  }

  cancelEdit = () => {
    this.props.deleteNewField();
    this.props.disableFieldEdit();
  }

  renderTabFields = () => {
    if(this.state.activeTab === 'basic') {
      return (
        <div>
            <FieldRenderer
              {...this.state}
              locals={this.props.locals}
              fieldConfigs={textFieldsConfigs}
              handleDataChange={this.handleDataChange}
            />
          </div>
      )
    } else {
      return (
        <div>
          <div className="ahfb-mb-4">
            <TextInput value={this.state.machineName} handleChange={e => this.handleDataChange(e.target.value, 'machineName')} label="Machine Name/Field ID" required={true} autoFocus error={this.state.errors.machineName}/>
          </div>
          <div className="ahfb-mb-4">
            <TextInput value={this.state.regex} handleChange={e => this.handleDataChange(e.target.value, 'regex')} label="Validation Regex" required={false} error={this.state.errors.regex}/>
          </div>
          {(this.state.regex && this.state.regex !== '') ? (
            <div className="ahfb-mb-4">
              <TextInput value={this.state.regexErrMsg} handleChange={e => this.handleDataChange(e.target.value, 'regexErrMsg')} label="Regex Validation Error Msg" required={false}/>
            </div>
          ) : ""}
          <div className="ahfb-mb-4">
            <SearchableSelect options={[{label: 'Visible', value: 'visible'}, {label: 'Hidden', value: 'hidden'}]} label="Visibility to Employee" value={(this.state.visibility) ? 'visible' : 'hidden'} handleChange={e => this.handleDataChange((e.target.value === 'visible'), 'visibility')}/>
          </div>
          <ConditionalLogic predefined={this.props.predefined} conditionalLogic={this.state.conditionalLogic} isConditionalEnabled={this.state.isConditionalEnabled} handleChange={this.handleDataChange} errors={(this.state.errors.conditionalLogic) ? this.state.errors.conditionalLogic : []}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <SimpleTabs value={this.state.activeTab} handleChange={this.handleTabChange} options={[{label: 'Basic Settings', value: 'basic'}, {label: 'Advance Settings', value: 'advance'}]}/>
        <Scrollbars style={{height: getHeight(true, true)}} autoHide>
          <div className="ahfb-p-3 ahfb-my-3">
            {this.renderTabFields()}
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
  fields: state.form.data,
  operation: state.toolbar.operation,
  predefined: state.form.predefined,
  locals: state.form.locals,
})

const mapDispatchToProps = dispatch => ({
  disableFieldEdit: () => dispatch(disableFieldEdit()),
  deleteNewField: () => dispatch(deleteNewField()),
  createField: (data) => dispatch(createField(data)),
  updateField: (data) => dispatch(updateField(data)),
  deleteField: (id) => dispatch(deleteField(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TextField);