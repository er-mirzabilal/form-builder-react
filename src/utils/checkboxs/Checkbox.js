import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CustomCheckbox(props) {
  const {checked, handleChange, label, disabled} = props;

  return (
    <FormControlLabel disabled={disabled}
      control={
        <Checkbox checked={checked} onChange={e => handleChange(e.target.checked)} color="primary"/>
      }
      label={label}
    />
  );
}