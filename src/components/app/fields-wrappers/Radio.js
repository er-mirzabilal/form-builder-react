import React from 'react'
import RadioGroup from "../../../utils/radio/RadioGroup";
import Input from '../../../utils/inputs/TextInput'

export default function RadioWrapper(props) {
  const [value, setValue] = React.useState(null);
  const [other, setOther] = React.useState(false);
  const [otherValue, setOtherValue] = React.useState('');

  const handleChange = (e) => {
    let newValue = e.target.value;
    if(newValue === 'Specify Others') {
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
      <RadioGroup
        label={props.data.name}
        required={props.data.config.isRequired}
        helperText={props.data.config.helpText}
        options={options}
        labelProp='name'
        valueProp='name'
        value={value}
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
    <RadioGroup
      label={props.data.name}
      required={props.data.config.isRequired}
      helperText={props.data.config.helpText}
      options={options}
      labelProp='name'
      valueProp='name'
      value={value}
      handleChange={handleChange}
    />
  )
}
