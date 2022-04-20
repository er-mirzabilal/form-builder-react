import React from 'react'
import Input from "../../../utils/inputs/TextInput";
import MultiSelect from "../../../utils/selects/MultiSelect";
import SearchableSelect from "../../../utils/selects/SearchableSelect";
import CheckboxGroup from '../../../utils/checkboxs/CheckboxGroup'

export default function SelectWrapper(props) {
  let defaultValue = [];
  const [value, setValue] = React.useState(defaultValue);
  const [other, setOther] = React.useState(false);
  const [otherValue, setOtherValue] = React.useState('');

  const handleChange = (e) => {
    let newValue = e.target.value;
    if(props.data.config.isMultiple && newValue.includes(-1)) {
      setOther(true);
    } else if(!props.data.config.isMultiple && newValue === -1) {
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

  if(props.data.config.isMultiple) {
    if(other) {
      return [
        <MultiSelect
          label={props.data.name}
          placeholder={props.data.config.placeholder}
          helperText={props.data.config.helpText}
          required={props.data.config.isRequired}
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
      <MultiSelect
        label={props.data.name}
        placeholder={props.data.config.placeholder}
        helperText={props.data.config.helpText}
        required={props.data.config.isRequired}
        options={options}
        value={value}
        labelProp='name'
        valueProp='id'
        handleChange={handleChange}
      />
    )
  } else {
    if(other) {
      return [
        <SearchableSelect
          label={props.data.name}
          placeholder={props.data.config.placeholder}
          helperText={props.data.config.helpText}
          required={props.data.config.isRequired}
          labelProp='name'
          valueProp='id'
          options={options}
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
      <SearchableSelect
        label={props.data.name}
        placeholder={props.data.config.placeholder}
        helperText={props.data.config.helpText}
        required={props.data.config.isRequired}
        labelProp='name'
        valueProp='id'
        options={options}
        value={value}
        handleChange={handleChange}
      />
    )
  }
}
