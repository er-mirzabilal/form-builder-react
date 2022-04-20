import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import Checkbox from "../checkboxs/Checkbox";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from '@material-ui/icons/Add'
import SearchableSelect from "../selects/SearchableSelect";
import './style.scss';
import ConditionItem from "./ConditionItem";
import Button from "@material-ui/core/Button";

function ConditionalLogic(props) {
  const conditionalLogic = _.cloneDeep(props.conditionalLogic);
  let singleFields = [];
  let multiFields = [];
  let textFields = [];
  let numberFields = [];
  let fields = [];
  const extractOptionsFromPredefined = (referenceId, options) => {
    if(referenceId) {
      for(let i = 0; i < props.predefined.length; i++) {
        if(props.predefined[i].id === referenceId) {
          return props.predefined[i].options;
        }
      }
    }
    return options;
  }

  const getOptions = () => {
    let options = {};
    let allFields = {
      ...props.conditionableFields,
      ...props.data
    }

    _.map(allFields, (field, uuid) => {
      if(field.type === 'select') {
        if(field.config.isMultiple) {
          multiFields.push(field.machineName);
        } else {
          singleFields.push(field.machineName);
        }
        fields.push(field);
        options[field.machineName] = extractOptionsFromPredefined(field.config.optionReferenceId, field.config.options);
      } else if(field.type === 'radio') {
        singleFields.push(field.machineName);
        fields.push(field);
        options[field.machineName] = options[field.machineName] = extractOptionsFromPredefined(field.config.optionReferenceId, field.config.options);
      } else if(field.type === 'checkbox') {
        multiFields.push(field.machineName);
        fields.push(field);
        options[field.machineName] = options[field.machineName] = extractOptionsFromPredefined(field.config.optionReferenceId, field.config.options);
      } else if(field.type === 'text') {
        if(field.config.subType === 'number') {
          numberFields.push(field.machineName);
          fields.push(field);
        } else {
          textFields.push(field.machineName);
          fields.push(field);
        }
      }
    })
    return options;
  }

  const handleChange = (val, name) => {
    props.handleChange({
      ...props.conditionalLogic,
      [name]: val
    }, 'conditionalLogic')
  }

  const enableConditionalLogic = (val) => {
    props.handleChange(val, 'isConditionalEnabled')
    if(!val) {
      props.handleChange({
        ...props.conditionalLogic,
        conditions: []
      }, 'conditionalLogic')
    }
  }

  const handleConditionChange = (val, index) => {
    let conditions = _.cloneDeep(props.conditionalLogic.conditions);
    conditions[index] = val;
    props.handleChange({
      ...props.conditionalLogic,
      conditions: conditions
    }, 'conditionalLogic')
  }

  const addCondition = () => {
    let conditions = _.cloneDeep(props.conditionalLogic.conditions);
    conditions.push({field: null, operator: 'contain', value: ''});
    props.handleChange({
      ...props.conditionalLogic,
      conditions: conditions
    }, 'conditionalLogic')
  }

  const deleteCondition = (index) => {
    let conditions = _.cloneDeep(props.conditionalLogic.conditions);
    conditions.splice(index);
    props.handleChange({
      ...props.conditionalLogic,
      conditions: conditions
    }, 'conditionalLogic')
  }

  const renderConditions = () => {
    let options = getOptions();
    if(conditionalLogic.conditions.length) {
      return conditionalLogic.conditions.map((condition, index) => {
        let errors = (props.errors[index]) ? props.errors[index] : {};
        return (
          <ConditionItem key={index} errors={errors} index={index} handleChange={val => handleConditionChange(val, index)} deleteCondition={e => deleteCondition(index)} fields={fields} condition={condition} multiFields={multiFields} singleFields={singleFields} textFields={textFields} numberFields={numberFields} options={options}/>
        )
      })
    } else {
      return (
        <div className="ahfb-width-full ahfb-py-3 ahfb-text-center">
          <p className="ahfb-text-muted">Click below to add condition.</p>
        </div>
      )
    }
  }

  if(props.isConditionalEnabled) {
    return (
      <div>
        <div>
          <Checkbox checked={props.isConditionalEnabled} handleChange={val => enableConditionalLogic(val)} label="Enable Conditional Logic"/>
        </div>
        <div className="ahfb-d-flow-root">
          <span className="ahfb-float-left ahfb-conditional-main-dropdowns ahfb-mr-1"><SearchableSelect value={props.conditionalLogic.display} handleChange={e => handleChange(e.target.value, 'display')} options={[{label: 'Show', value: 'show'}, {label: 'Hide', value: 'hide'}]} disableClearable/></span>
          <span className="ahfb-d-flex ahfb-float-left ahfb-mt-1"> this field if </span>
          <span className="ahfb-float-left ahfb-conditional-main-dropdowns ahfb-mx-1"><SearchableSelect value={props.conditionalLogic.logic} handleChange={e => handleChange(e.target.value, 'logic')} options={[{label: 'All', value: 'all'}, {label: 'Any', value: 'any'}]} disableClearable/></span>
          <span className="ahfb-d-flex ahfb-float-left ahfb-mt-1"> of the following match:</span>
        </div>
        <div className="ahfb-mt-2">
          {renderConditions()}
          <div className="ahfb-clearfix">
            <Button onClick={addCondition} color="primary"><AddIcon/> {(conditionalLogic.conditions.length) ? 'Add another condition' : 'Add condition'}</Button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Checkbox checked={props.isConditionalEnabled} handleChange={val => enableConditionalLogic(val)} label="Enable Conditional Logic"/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.form.data,
  conditionableFields: state.form.conditionableFields
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ConditionalLogic);