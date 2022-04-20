import React from 'react';
import SearchableSelect from "../selects/SearchableSelect";
import TextInput from "../inputs/TextInput";
import MultiSelect from "../selects/MultiSelect";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import RemoveIcon from '@material-ui/icons/Clear'
import { Grid } from '@material-ui/core'

export default function ConditionItem(props) {

  const getOptions = () => {
    let options = [
      {label: 'Contains', value: 'contain'},
      {label: 'Starts with', value: 'prefix'},
      {label: 'Ends with', value: 'postfix'},
    ];

    if(props.condition.field) {
      if(props.multiFields.includes(props.condition.field)) {
        options = [
          {label: 'Includes', value: 'includes'},
          {label: 'Include Any', value: 'include-any'},
          {label: 'Excludes', value: 'excludes'},
          {label: 'Exclude Any', value: 'exclude-any'},
        ];
      } else if(props.singleFields.includes(props.condition.field)) {
        options = [
          {label: 'Is', value: 'is'},
          {label: 'Is Not', value: 'not'},
        ];
      } else if(props.numberFields.includes(props.condition.field)) {
        options = [
          {label: 'Equals', value: 'equal'},
          {label: 'Greater than', value: 'greater'},
          {label: 'Less than', value: 'less'}
        ];
      }
    }
    return options;
  }

  const getType = () => {
    let type = 'text';
    if(props.condition.field) {
      if(props.multiFields.includes(props.condition.field)) {
        type = 'multiple';
      } else if(props.singleFields.includes(props.condition.field)) {
        type = 'single';
      } else if(props.numberFields.includes(props.condition.field)) {
        type = 'number';
      }
    }
    return type;
  }

  const handleChange = (val, name) => {
    let condition = {
      ...props.condition,
      [name]: val
    }
    props.handleChange(condition);
  }

  const renderOptions = () => {
    let type = getType();
    if (type === 'number') {
      return (
        <TextInput placeholder="Value" type="number" value={props.condition.value} handleChange={e => handleChange(e.target.value, 'value')} error={props.errors.value}/>
      )
    } else if (type === 'single') {
      return (
        <SearchableSelect disableClearable placeholder="Value" options={props.options[props.condition.field]} value={props.condition.value} handleChange={e => handleChange(e.target.value, 'value')} error={props.errors.value} labelProp="name" valueProp="id"/>
      )
    } else if (type === 'multiple') {
      return (
        <MultiSelect placeholder="Value" options={props.options[props.condition.field]} value={props.condition.value} handleChange={e => handleChange(e.target.value, 'value')} error={props.errors.value} labelProp="name" valueProp="id"/>
      )
    } else {
      return (
        <TextInput placeholder="Value" value={props.condition.value} handleChange={e => handleChange(e.target.value, 'value')} error={props.errors.value}/>
      )
    }
  }

  return (
    <Grid container className="ahfb-mx-0 ahfb-pt-2 ahfb-pb-3 ahfb-px-2 ahfb-conditions-item-main ahfb-mb-3">
      <Grid item xs={10} className="ahfb-pl-0">
        <Typography variant="button">Condition #{props.index + 1}</Typography>
      </Grid>
      <Grid item xs={2} className="ahfb-text-right ahfb-pr-0">
        <IconButton size="small" onClick={props.deleteCondition}><RemoveIcon fontSize="small" className="ahfb-pull-right" color="action"/></IconButton>
      </Grid>
      <hr className="ahfb-condition-divider ahfb-mt-0 ahfb-mb-2"/>
      <Grid item xs={12} className="ahfb-px-1 ahfb-mb-2">
        <SearchableSelect disableClearable placeholder="Field" options={props.fields} labelProp="name" valueProp="machineName" value={props.condition.field}  handleChange={e => handleChange(e.target.value, 'field')}  error={props.errors.field}/>
      </Grid>
      <Grid item xs={6} className="ahfb-pr-1">
        <SearchableSelect disableClearable placeholder="Operator" options={getOptions()} value={props.condition.operator} handleChange={e => handleChange(e.target.value, 'operator')}  error={props.errors.operator}/>
      </Grid>
      <Grid item xs={6} className="ahfb-pl-1">
        {renderOptions()}
      </Grid>
    </Grid>
  )
}