import React from 'react';
import SimpleTabs from "../../../utils/Tabs/SimpleTabs";
import TextInput from "../../../utils/inputs/TextInput";
import Checkbox from "../../../utils/checkboxs/Checkbox";
import SearchableSelect from "../../../utils/selects/SearchableSelect";
import RadioGroup from "../../../utils/radio/RadioGroup";
import ValidateField from "../../../utils/validations/ValidateField";
import Button from "@material-ui/core/Button";
import {disableFieldEdit} from "../../../actions/toolbarActions";
import {createField, deleteField, updateField, deleteNewField} from "../../../actions/formActions";
import {connect} from "react-redux";
import ConditionalLogic from "../../../utils/conditional-logic";
import { Scrollbars } from 'react-custom-scrollbars';
import { getHeight } from '../../../utils/helpers';


class SectionField extends React.Component {
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
      ...props.data.config
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
          ...nextProps.data.config
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
    const {name, machineName, order, conditionalLogic, isConditionalEnabled, subType, visibility, uuid, type,collapseable,columns,parentId} = this.state;
    let newField = {name, machineName, order, uuid, type,parentId, config: {conditionalLogic, isConditionalEnabled,subType,collapseable , visibility,columns}};
    ValidateField(newField, this.props.fields)
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
          <div className="ahfb-mb-4">
            <TextInput value={this.state.name} handleChange={e => this.handleDataChange(e.target.value, 'name')} label="Section Name" required={true} autoFocus error={this.state.errors.name}/>
          </div>
          <div className="ahfb-mb-4">
            <SearchableSelect disableClearable ={true} options={[{label: 'Simple', value: 'simple'}, {label: 'Multiple', value: 'multiple'}]} label="SubType" value={this.state.subType} handleChange={e => this.handleDataChange(e.target.value, 'subType')}/>
          </div>
          <div className="ahfb-mb-4">
          <RadioGroup
              label='Column layout'
              options={[{label: '1 Column', value: '1'}, {label: '2 Columns', value: '2'}, {label: '3 Columns', value: '3'}]}
              value={this.state.columns}
              handleChange={e => this.handleDataChange(e.target.value, 'columns')}
          />
          </div>
          <Checkbox checked={this.state.collapseable} handleChange={val => this.handleDataChange(val, 'collapseable')} label="Enable Collapse"/>
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
              <Button className={"btn btn-info ahfb-mr-4"} onClick={this.cancelEdit}>
                Cancel
              </Button>
              <Button className={"btn btn-primary ahfb-mr-4"} disableElevation onClick={this.saveField}>
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
  predefined: state.form.predefined
})

const mapDispatchToProps = dispatch => ({
  disableFieldEdit: () => dispatch(disableFieldEdit()),
  deleteNewField: () => dispatch(deleteNewField()),
  createField: (data) => dispatch(createField(data)),
  updateField: (data) => dispatch(updateField(data)),
  deleteField: (id) => dispatch(deleteField(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SectionField);