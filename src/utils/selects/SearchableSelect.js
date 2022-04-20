import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormLabel from "@material-ui/core/FormLabel";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  labelRoot: {
    transform: 'none'
  }
}));

export default function SearchableSelect(props) {
  const classes = useStyles();
  const {options, value, handleChange, label, error, required, placeholder, helperText, disabled, disableClearable} = props;
  let labelProp = (props.labelProp) ? props.labelProp : 'label';
  let valueProp = (props.valueProp) ? props.valueProp : 'value';
  let formattedValue = null;
  for (let i = 0; i < options.length; i++) {
    if(options[i][valueProp] === value) {
      formattedValue = options[i];
    }
  }

  return (
    <Autocomplete
      value={formattedValue}
      options={options}
      disabled={disabled}
      getOptionLabel={option => option[labelProp]}
      onChange={(e, value) => {handleChange({target: {value: value[valueProp]}})}}
      disableClearable={disableClearable}
      renderInput={params => <TextField {...params}  required={required} placeholder={(value) ? "" : placeholder}  InputLabelProps={{ shrink: true, classes: {shrink: classes.labelRoot} }} label={label} error={!!(error)} helperText={((error) ? error : ((helperText) ? helperText: null))}/>}
    />
  );
}
