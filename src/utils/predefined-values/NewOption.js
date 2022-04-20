import React, { useEffect, useRef } from 'react'
import TextInput from "../inputs/TextInput";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import { stringToSlug } from '../helpers'
import { Grid } from '@material-ui/core'

export default function NewOption(props) {
  const [name, setName] = React.useState('');
  const [value, setValue] = React.useState('');
  const [updated, setUpdated] = React.useState('');
  const [error, setError] = React.useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef?.current?.focus();
  },[])
  const handleNameChange = (e) => {
    setError('');
    setName(e.target.value);
  }

  const handleValueChange = (e) => {
    setError('');
    setValue(e.target.value);
  }

  const saveNewOption = (e) => {
    e.preventDefault();
    let values = [];
    let properValue = value;
    if(!value || value === '') {
      properValue = stringToSlug(name);
    }
    props.options.map((option) => {
      values.push(option.name);
    })
    if(values.includes(name)) {
      setError('Category with same name already exists.')
    } else {
      props.saveNewCategoryOption(name, properValue)
      setName('');
      setValue('');
    }
     inputRef?.current?.focus();
  }

  return (
    <form onSubmit={saveNewOption}>
      <Grid container className="ahfb-pl-3">
        <Grid item xs={6}>
          <TextInput
            inputProps={{ref: inputRef}}
            placeholder="Name"
            value={name}
            handleChange={handleNameChange}
            error={error}
          />
        </Grid>
        <Grid className="ahfb-pl-2" item xs={6}>
          <TextInput
            placeholder="Value"
            value={value}
            handleChange={handleValueChange}
          />
        </Grid>
      </Grid>
      <button className="ahfb-hidden" type="submit">Submit</button>
    </form>
  )
}