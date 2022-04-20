import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import _ from 'lodash';

export default function CheckboxGroup(props) {
  const {row, options, value, handleChange, label, error, required, helperText, disabled} = props;
  let labelProp = (props.labelProp) ? props.labelProp : 'label';
  let valueProp = (props.valueProp) ? props.valueProp : 'value';

  const handleValueChange = (val) => {
    let newValue = _.cloneDeep(value);
    if(newValue.includes(val)) {
      newValue.splice(value.indexOf(val), 1);
    } else {
      newValue.push(val);
    }
    handleChange({target: {value: newValue}});
  }

  return (
    <FormControl required={required} error={error} component="fieldset" disabled={disabled}>
      <FormLabel component="label">{label}</FormLabel>
      <FormGroup row={row}>
        {options.map((option) => (
          <FormControlLabel key={'option-' + option[valueProp]}
            control={
              <Checkbox color="primary" checked={(value.includes(option[valueProp]))} onChange={e => handleValueChange(option[valueProp])} value={option[valueProp]} />
            }
            label={option[labelProp]}
          />
        ))}
      </FormGroup>
      <FormHelperText>{((error) ? error : ((helperText) ? helperText: ''))}</FormHelperText>
    </FormControl>
  );
}