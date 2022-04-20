import React from 'react';
import SimpleTabs from "../../../utils/Tabs/SimpleTabs";
import TextInput from "../../../utils/inputs/TextInput";
import ValidateField from "../../../utils/validations/ValidateField";
import Button from "@material-ui/core/Button";
import {disableFieldEdit} from "../../../actions/toolbarActions";
import { createField, deleteField, deleteNewField, updateField } from '../../../actions/formActions'
import {connect} from "react-redux";
import { Scrollbars } from 'react-custom-scrollbars'
import ConditionalLogic from '../../../utils/conditional-logic'
import SearchableSelect from '../../../utils/selects/SearchableSelect'
import { getHeight } from '../../../utils/helpers'
import FieldRenderer from './utils/FieldRenderer'
import { eSignatureFieldsConfigs } from './utils/eSignatureFieldConfigs'
import { processLocalFields } from './utils/helpers'

class Signature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'basic',
      errors: {},
      uuid: props.data.uuid,
      name: props.data.name,
      type: props.data.type,
      order: props.data.order,
      parentId: props.data.parentId,
      machineName: props.data.machineName,
      ...props.data.config,
    }
    console.log('constructor', this.state);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data.uuid !== this.state.uuid){
      this.setState({
          activeTab: 'basic',
          errors: {},
          uuid: nextProps.data.uuid,
          name: nextProps.data.name,
          type: nextProps.data.type,
          order: nextProps.data.order,
          parentId: nextProps.data.parentId,
          machineName: nextProps.data.machineName,
          ...nextProps.data.config,
        }
      );
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
    const {name, machineName, order, conditionalLogic, isRequired, helpText, subType, visibility, uuid, type,parentId} = this.state;
    let newField = {name, machineName, order, uuid, type,parentId, config: {conditionalLogic, isConditionalEnabled:!!conditionalLogic.conditions.length,isRequired, helpText, subType, visibility}};
    newField.locals = processLocalFields(this.props.locals, this.state);
    ValidateField(newField)
      .then(() => {
        this.props.updateField(newField);
        this.props.disableFieldEdit();
      }).catch((errors) => {
        let keys = Object.keys(errors);
        if(keys[0] === 'machineName' || keys[0] === 'conditionalLogic') {
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
            fieldConfigs={eSignatureFieldsConfigs}
            handleDataChange={this.handleDataChange}
          />
          {/*<Checkbox checked={this.state.isRequired} handleChange={val => this.handleDataChange(val, 'isRequired')} label="Required"/>*/}
          {/*<div className="ahfb-mb-4">*/}
          {/*  <TextInput value={this.state.name} handleChange={e => this.handleDataChange(e.target.value, 'name')} label="Field Name" required={true} autoFocus error={this.state.errors.name}/>*/}
          {/*</div>*/}
          {/*<div className="ahfb-mb-4">*/}
          {/*  <TextInput value={this.state.helpText} handleChange={e => this.handleDataChange(e.target.value, 'helpText')} label="Help Text"/>*/}
          {/*</div>*/}
        </div>
      )
    } else {
      return (
        <div>
          <div className="ahfb-mb-4">
            <TextInput value={this.state.machineName} handleChange={e => this.handleDataChange(e.target.value, 'machineName')} label="Machine Name/Field ID" required={true} autoFocus error={this.state.errors.machineName}/>
          </div>
          <div className="ahfb-mb-4">
            <SearchableSelect options={[{label: 'Visible', value: 'visible'}, {label: 'Hidden', value: 'hidden'}]} label="Visibility to Employee" value={(this.state.visibility) ? 'visible' : 'hidden'} handleChange={e => this.handleDataChange((e.target.value === 'visible'), 'visibility')}/>
          </div>
          <ConditionalLogic predefined={this.props.predefined}  conditionalLogic={this.state.conditionalLogic} isConditionalEnabled={this.state.isConditionalEnabled} handleChange={this.handleDataChange} errors={(this.state.errors.conditionalLogic) ? this.state.errors.conditionalLogic : []}/>
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
  operation: state.toolbar.operation,
  predefined: state.form.predefined,
  locals: state.form.locals
})

const mapDispatchToProps = dispatch => ({
  disableFieldEdit: () => dispatch(disableFieldEdit()),
  deleteNewField: () => dispatch(deleteNewField()),
  createField: (data) => dispatch(createField(data)),
  updateField: (data) => dispatch(updateField(data)),
  deleteField: (id) => dispatch(deleteField(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signature);