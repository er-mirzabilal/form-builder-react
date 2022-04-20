import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => ({
  labelRoot: {
    transform: 'none'
  },

}));

const TextInput = (props) => {
  const {value, handleChange, required, inputProps, helperText, error, startAdornment, endAdornment, label, placeholder, disabled, autoFocus, type} = props;
  const classes = useStyles();

  return (
    <FormControl required={required} disabled={disabled} error={!!(error)} fullWidth={true}>
      {(label) ? (
        <InputLabel required={required} shrink={true} classes={{shrink: classes.labelRoot}}>{label}</InputLabel>
      ) : ""}
      <Input
        autoFocus={!!autoFocus}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        startAdornment={(startAdornment) ? (<InputAdornment position="start">{startAdornment}</InputAdornment>) : null}
        endAdornment={(endAdornment) ? (<InputAdornment position="end">{endAdornment}</InputAdornment>) : null}
        inputProps={inputProps}
        type={(type) ? type : 'text'}
        onBlur={props.onBlur}
        classes={{root: classes.inputRoot}}
      />
      {(helperText) ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : ""}
      {!!(error) ? (
        <FormHelperText error={true}>{error}</FormHelperText>
      ) : ""}
    </FormControl>
  )
}

export default TextInput;