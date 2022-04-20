import React from 'react'
import CheckboxGroup from "../../../utils/checkboxs/CheckboxGroup";
import Input from "../../../utils/inputs/TextInput";

export default function CheckboxWrapper(props) {
  const [value, setValue] = React.useState([]);
  const [other, setOther] = React.useState(false);
  const [otherValue, setOtherValue] = React.useState('');

  const handleChange = (e) => {
    let newValue = e.target.value;
    if(newValue.includes(-1)) {
      setOther(true);
    } else {
      setOther(false);
      setOtherValue('');
    }
    setValue(newValue);
  }

  const handleOtherChange = (e) => {
    setOtherValue(e.target.value);
  }

  let options = [];
  if(props.data.config.optionReferenceId) {
    options = _.cloneDeep(props.predefined[props.data.config.optionReferenceId].options);
  }
  if(props.data.config.enableOther) {
    options.push({id: -1, name: 'Specify Others'});
  }

  if(other) {
    return [
      <CheckboxGroup
        row={false}
        label={props.data.name}
        required={props.data.config.isRequired}
        helperText={props.data.config.helpText}
        options={options}
        value={value}
        labelProp='name'
        valueProp='id'
        handleChange={handleChange}
      />,
      <Input
        handleChange={handleOtherChange}
        value={otherValue}
        placeholder="Specify Others"
      />
    ]
  }

  return (
    <CheckboxGroup
      row={false}
      label={props.data.name}
      required={props.data.config.isRequired}
      helperText={props.data.config.helpText}
      options={options}
      value={value}
      labelProp='name'
      valueProp='id'
      handleChange={handleChange}
    />
  )
}
