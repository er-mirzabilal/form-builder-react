import React from 'react'
import _ from 'lodash'
import { FIELD_TYPES } from '../../../../utils/Globals'
import Checkbox from '../../../../utils/checkboxs/Checkbox'
import SearchableSelect from '../../../../utils/selects/SearchableSelect'
import TextInput from '../../../../utils/inputs/TextInput'
import {connect} from "react-redux";

class FieldRenderer extends React.Component {

  renderLocalFields = (field, key) => {
    const {locals, addLanguageSelect} = this.props;

    if (field && locals && locals.length && field.isTranslatable) {
      return locals.reduce((arr, local) => {

        if (local.key === addLanguageSelect) {
          let newField = _.cloneDeep(field);

          newField.configs.label = `${field.configs.label} ${local.name}`;
          newField.configs.required = false;
          newField.configs.autoFocus = false;
          arr.push(this.renderField(newField, `${key}_${local.key}`, true));
        }

        return arr;
      }, [])
    }
  }

  renderField = (field, key) => {
    const {fieldConfigs, locals, handleDataChange, ...rest} = this.props;

    let error = false;
    if (field.error && key in rest.errors)
     error = rest.errors[key];

    switch (field.type) {
      case FIELD_TYPES.CHECKBOX:
        return (
          <div key={key} className="ahfb-mb-4">
            <Checkbox
              {...field.configs}
              checked={rest[key]}
              value={rest[key]}
              handleChange={val => handleDataChange(val, key)}
              error={error}
            />
          </div>
        )
      case FIELD_TYPES.SEARCHABLE_SELECT:
        return (
          <div key={key}  className="ahfb-mb-4">
            <SearchableSelect
              {...field.configs}
              value={rest[key]}
              handleChange={e => handleDataChange(e.target.value, key)}
              error={error}
            />
          </div>
        )
      case FIELD_TYPES.TEXT:
        return (
          <React.Fragment key={key}>
            <div className="ahfb-mb-4">
              <TextInput
                {...field.configs}
                value={rest[key]}
                handleChange={e => handleDataChange(e.target.value, key)}
                error={error}
              />
            </div>
          </React.Fragment>
        )
    }
  }


  render () {
    const {fieldConfigs} = this.props;

    return (
      <div>
        {fieldConfigs && Object.keys(fieldConfigs).map(key => {
          return (
            <React.Fragment key={key}>
              {this.renderField(fieldConfigs[key], key)}
              {fieldConfigs[key].isTranslatable && this.renderLocalFields(fieldConfigs[key], key)}
            </React.Fragment>
          )
        })}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  locals: state.form.locals,
  addLanguageSelect: state.form.addLanguageSelect
})

export default connect(mapStateToProps, null)(FieldRenderer);