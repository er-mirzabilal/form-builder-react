import React from 'react';
import {connect} from "react-redux";
import TextField from "./field-forms/TextField";
import Checkbox from "./field-forms/Checkbox";
import Content from "./field-forms/Content";
import Date from "./field-forms/Date";
import File from "./field-forms/File";
import Image from "./field-forms/Image";
import List from "./field-forms/List";
import Quiz from "./field-forms/Quiz";
import Select from "./field-forms/Select";
import Signature from "./field-forms/Signature";
import Survey from "./field-forms/Survey";
import Video from "./field-forms/Video";
import Radio from "./field-forms/Radio";
import Section from "./field-forms/Section";
import _ from 'lodash';

function EditField(props) {
  let field = {};
  if(props.newFieldData) {
    field = _.cloneDeep(props.newFieldData);
  } else {
    field = _.cloneDeep(props.data[props.editId]);

    if (field.locals && Object.keys(field.locals).length)
      Object.keys(field.locals).forEach(local => {
        if (local && Object.keys(local).length) field.config = {...field.config, ...field.locals[local]}
      });
  }
  const renderFieldForms = () => {
    switch(field.type) {
      case 'checkbox':
        return (
          <Checkbox data={field}/>
        )
      case 'radio':
        return (
          <Radio data={field}/>
        )
      case 'content':
        return (
            <Content data={field}/>
        )
      case 'date':
        return (
            <Date data={field}/>
        )
      case 'file':
        return (
            <File data={field}/>
        )
      case 'image':
        return (
            <Image data={field}/>
        )
      case 'list':
        return (
            <List data={field}/>
        )
      case 'quiz':
        return (
            <Quiz data={field}/>
        )
      case 'select':
        return (
            <Select data={field}/>
        )
      case 'signature':
        return (
            <Signature data={field}/>
        )
      case 'survey':
        return (
            <Survey data={field}/>
        )
      case 'text':
        return (
            <TextField data={field}/>
        )
      case 'video':
        return (
            <Video data={field}/>
        )
      case 'section':
        return <Section data={field}/>
      default:
        return (
          <div>Something magical happened</div>
        )
    }
  }
  return (
    <div className="position-relative ahfb-width-full">
      {renderFieldForms()}
    </div>
  )
}

const mapStateToProps = state => ({
  newFieldData: state.form.newFieldData,
  editId: state.toolbar.editId,
  data: state.form.data
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EditField);