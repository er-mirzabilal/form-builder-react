import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  labelRoot: {
    transform: 'none'
  }
}));

export default function MultiSelect(props) {
  const classes = useStyles();
  const {options, value, handleChange, label, error, required, placeholder, helperText, disabled} = props;
  let labelProp = (props.labelProp) ? props.labelProp : 'label';
  let valueProp = (props.valueProp) ? props.valueProp : 'value';
  let values = [];
  if(value.length) {
    options.map((option) => {
      if(value.includes(option[valueProp])) {
        values.push(option);
      }
    })
  }

  return (
    <Autocomplete
      multiple={true}
      options={options}
      getOptionLabel={option => option[labelProp]}
      value={values}
      disabled={disabled}
      disableCloseOnSelect={true}
      onChange={(event, newValue) => {
        handleChange({target: {value: newValue.map((item) => item[valueProp])}})
      }}
      renderOption={option => (
        <React.Fragment>
          <Checkbox
            checked={(value.includes(option[valueProp]))}
            color="primary"
          />
          {option[labelProp]}
        </React.Fragment>
      )}
      renderInput={params => <TextField {...params} required={required} placeholder={(value.length) ? "" : placeholder}  InputLabelProps={{ shrink: true, classes: {shrink: classes.labelRoot} }} label={label} error={!!(error)} helperText={((error) ? error : ((helperText) ? helperText: null))}/>}
    />
  );
}