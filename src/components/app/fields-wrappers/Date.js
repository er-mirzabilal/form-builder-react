import React from 'react'
import Input from "../../../utils/inputs/TextInput";
import CheckboxGroup from "../../../utils/checkboxs/CheckboxGroup";
import DatePicker from "../../../utils/date-picker";

export default function DateWrapper(props) {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (date) => {
    setValue(date);
  }

  return (
    <DatePicker
      row={false}
      label={props.data.name}
      required={props.data.config.isRequired}
      helperText={props.data.config.helpText}
      value={value}
      handleChange={handleChange}
    />
  )
}
