import React from 'react';
import TextInput from "../inputs/TextInput";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

export default function NewCategory(props) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    setError('');
    setValue(e.target.value);
  }

  const saveNewCategory = () => {
    if(props.names.includes(value.toLocaleLowerCase())) {
      setError('Category with same name already exists.')
    } else if(!value.length) {
      setError('Category name is required.')
    } else {
      props.saveNewCategory(value)
    }
  }

  return (
    <div className="ahfb-pl-3">
      <TextInput
        placeholder="Category Name"
        value={value}
        handleChange={handleChange}
        autoFocus={true}
        error={error}
        endAdornment={
          <React.Fragment>
            <IconButton size="small" onClick={saveNewCategory}><DoneIcon/></IconButton>
            <IconButton size="small" onClick={props.handleAddCategoryClose}><CloseIcon/></IconButton>
          </React.Fragment>
        }/>
    </div>
  )
}