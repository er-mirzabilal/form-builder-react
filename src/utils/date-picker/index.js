import 'date-fns';
import React from 'react';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import {FormHelperText} from "@material-ui/core";

const StyledDatePicker = styled(DatePicker)`
  .MuiInputLabel-shrink {
    transform: none;
  }
`;


export default function CustomDatePicker(props) {
  const {value, handleChange, label, error, required, helperText, disabled} = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledDatePicker
        fullWidth={true}
        clearable={true}
        label={label}
        openTo="date"
        variant="inline"
        views={["year", "month", "date"]}
        format="MM/dd/yyyy"
        margin="normal"
        value={value}
        onChange={handleChange}
        helperText={helperText}
        required={required}
      />
    </MuiPickersUtilsProvider>
  );
}