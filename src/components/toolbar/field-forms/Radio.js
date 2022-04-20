import React from 'react';
import SimpleTabs from "../../../utils/Tabs/SimpleTabs";
import TextInput from "../../../utils/inputs/TextInput";
import Checkbox from "../../../utils/checkboxs/Checkbox";
import ValidateField from "../../../utils/validations/ValidateField";
import Button from "@material-ui/core/Button";
import {disableFieldEdit} from "../../../actions/toolbarActions";
import { createField, deleteField, deleteNewField, updateField } from '../../../actions/formActions'
import {connect} from "react-redux";
import PredefinedValues from "../../../utils/predefined-values";
import Choices from "../../../utils/choices";
import { Scrollbars } from 'react-custom-scrollbars'
import ConditionalLogic from '../../../utils/conditional-logic'
import axios from 'axios'
import { addCategory, updateCategoryOptions } from '../../../actions/predefinedActions'
import { getHeight } from '../../../utils/helpers'
import FieldRenderer from './utils/FieldRenderer'
import { radioFieldsConfigs } from './utils/radioFieldConfigs'
import { processLocalFields } from './utils/helpers'
import SearchableSelect from '../../../utils/selects/SearchableSelect'

class Radio extends React.Component {
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
          type: nextProps.data.type,
          order: nextProps.data.order,
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
    const {name, machineName, order, conditionalLogic, isRequired, placeholder, helpText, subType, visibility, uuid, type, optionReferenceId, enableOther,parentId} = this.state;
    let newField = {name, machineName, order, uuid, type,parentId, config: {conditionalLogic,isConditionalEnabled:!!conditionalLogic.conditions.length, isRequired, placeholder, helpText, subType, visibility, optionReferenceId, enableOther}};

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

  updateChoices = (options) => {
    this.setState({
      options: options
    })
  }

  insertChoices = (id) => {
    if(this.state.optionReferenceId){
      axios.post(`${this.props.predefinedEndpoint}/insert-predefine`,{optionReferenceId: this.state.optionReferenceId, predefinedOptRefId: id})
        .then((res) => {
          this.props.updateCategoryOptions(res.data.optionReference.options, res.data.optionReference.slug);
        })
    }
    else {
      this.disablePredefined().then((res) => {
        axios.post(`${this.props.predefinedEndpoint}/insert-predefine`,{optionReferenceId: this.state.optionReferenceId, predefinedOptRefId: id})
          .then((response) => {
            this.props.updateCategoryOptions(response.data.optionReference.options, response.data.optionReference.slug);
          })
      })
    }
  }


  disablePredefined = () => {
    return new Promise((resolve, reject) => {
      let options = [];
      for(let i = 0; i < this.props.predefined.length; i++) {
        if(this.props.predefined[i].id === this.state.optionReferenceId) {
          this.props.predefined[i].options.map((option) => {options.push({name: option.name, value: option.value})});
          break;
        }
      }
      axios.post(this.props.predefinedEndpoint, {name: this.state.machineName, slug: this.state.machineName, isPublic: false, options: options})
        .then((res) => {
          this.props.addCategory(res.data);
          this.setState({
            optionReferenceId: res.data.id
          }, () => {

            resolve(res.data);
          })
        })
    })
  }

  renderTabFields = () => {
    if(this.state.activeTab === 'basic') {
      return (
        <div>
          <FieldRenderer
            {...this.state}
            locals={this.props.locals}
            fieldConfigs={radioFieldsConfigs}
            handleDataChange={this.handleDataChange}
          />

          {/*<Checkbox checked={this.state.isRequired} handleChange={val => this.handleDataChange(val, 'isRequired')} label="Required"/>*/}
          {/*<div className="ahfb-mb-4">*/}
          {/*  <TextInput value={this.state.name} handleChange={e => this.handleDataChange(e.target.value, 'name')} label="Field Name" required={true} autoFocus error={this.state.errors.name}/>*/}
          {/*</div>*/}
          {/*<div className="ahfb-mb-4">*/}
          {/*  <TextInput value={this.state.helpText} handleChange={e => this.handleDataChange(e.target.value, 'helpText')} label="Help Text"/>*/}
          {/*</div>*/}
          {/*<div className="ahfb-mb-4">*/}
          {/*  <TextInput value={this.state.placeholder} handleChange={e => this.handleDataChange(e.target.value, 'placeholder')} label="Placeholder"/>*/}
          {/*</div>*/}
          <div className="ahfb-mb-4">
            <Choices disablePredefined={this.disablePredefined} predefined={this.props.predefined} optionReferenceId={this.state.optionReferenceId} required={true} label="Choices" updateChoices={this.updateChoices} choices={this.state.options} error={this.state.errors.options}/>
          </div>
          <PredefinedValues insertChoices={this.insertChoices} selected={this.state.optionReferenceId}/>
          <div className="ahfb-mb-4">
            <Checkbox checked={this.state.enableOther} handleChange={val => this.handleDataChange(val, 'enableOther')} label='Enable "Other" Choice'/>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="ahfb-mb-3">
            <TextInput value={this.state.machineName} handleChange={e => this.handleDataChange(e.target.value, 'machineName')} label="Machine Name/Field ID" required={true} autoFocus error={this.state.errors.machineName}/>
          </div>
          <div className="ahfb-mb-4">
            <SearchableSelect options={[{label: 'Visible', value: 'visible'}, {label: 'Hidden', value: 'hidden'}]} label="Visibility to Employee" value={(this.state.visibility) ? 'visible' : 'hidden'} handleChange={e => this.handleDataChange((e.target.value === 'visible'), 'visibility')}/>
          </div>
          <ConditionalLogic conditionalLogic={this.state.conditionalLogic} isConditionalEnabled={this.state.isConditionalEnabled} handleChange={this.handleDataChange} errors={(this.state.errors.conditionalLogic) ? this.state.errors.conditionalLogic : []} predefined={this.props.predefined}/>
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
  predefinedEndpoint: state.form.predefinedEndpoint,
  locals: state.form.locals
})

const mapDispatchToProps = dispatch => ({
  disableFieldEdit: () => dispatch(disableFieldEdit()),
  deleteNewField: () => dispatch(deleteNewField()),
  createField: (data) => dispatch(createField(data)),
  updateField: (data) => dispatch(updateField(data)),
  deleteField: (id) => dispatch(deleteField(id)),
  addCategory: (id) => dispatch(addCategory(id)),
  updateCategoryOptions: (data, slug) => dispatch(updateCategoryOptions(data, slug))

})

export default connect(mapStateToProps, mapDispatchToProps)(Radio);