import React from 'react'
import Input from "../../../utils/inputs/TextInput";
import FileUpload from "../../../utils/file-upload";
export default function FileWrapper(props) {
  return (
    <FileUpload
      label={props.data.name}
      helperText={props.data.config.helpText}
      placeholder={props.data.config.placeholder}
      required={props.data.config.isRequired}
      uploadable={false}
      isMultiple={props.data.config.isMultiple}
    />
  )
}
