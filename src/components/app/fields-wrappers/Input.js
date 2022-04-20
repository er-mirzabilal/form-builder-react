import React from 'react'
import Input from "../../../utils/inputs/TextInput";
export default function InputWrapper(props) {
  const [value, setValue] = React.useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <Input
      label={props.data.name}
      helperText={props.data.config.helpText}
      placeholder={props.data.config.placeholder}
      required={props.data.config.isRequired}
      value={value}
      handleChange={handleChange}
    />
  )
}
