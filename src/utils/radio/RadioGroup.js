import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import _ from 'lodash';
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

export default function CustomRadioGroup(props) {
  const {options, value, handleChange, label, error, required, helperText, disabled} = props;
  let labelProp = (props.labelProp) ? props.labelProp : 'label';
  let valueProp = (props.valueProp) ? props.valueProp : 'value';

  return (
    <FormControl required={required} error={error} component="fieldset" disabled={disabled}>
      <FormLabel component="label">{label}</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        {options.map((option) => (
          <FormControlLabel key={'option-' + option[valueProp]}
            control={
              <Radio color="primary" value={option[valueProp]} />
            }
            label={option[labelProp]}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{((error) ? error : ((helperText) ? helperText: ''))}</FormHelperText>
    </FormControl>
  );
}