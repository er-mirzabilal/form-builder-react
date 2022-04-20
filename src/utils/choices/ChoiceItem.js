import React from 'react';
import TextInput from "../inputs/TextInput";

export default function ChoiceItem(props) {
  const [label, setLabel] = React.useState(props.label);

  const handleChange = (e) => {
    setLabel(e.target.value);
  }

  return (
    <TextInput value={label} handleChange={handleChange} onBlur={e => props.updateChoice(e.target.value, props.index)}/>
  )
}