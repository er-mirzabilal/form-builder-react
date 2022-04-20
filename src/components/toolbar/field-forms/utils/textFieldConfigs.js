import { FIELD_TYPES } from '../../../../utils/Globals'

export const textFieldsConfigs = {
  isRequired: {
    type: FIELD_TYPES.CHECKBOX,
    configs: {
      label: 'Required'
    }
  },
  name: {
    type: FIELD_TYPES.TEXT,
    isTranslatable: true,
    error: true,
    configs: {
      label: 'Field Name',
      required: true,
      autoFocus: true
    }
  },
  subType: {
    type: FIELD_TYPES.SEARCHABLE_SELECT,
    configs: {
      label: 'Field type',
      options: [
        {label: 'Text', value: 'text'},
        {label: 'Number', value: 'number'},
        {label: 'Email', value: 'email'}
      ]
    },
  },
  helpText: {
    type: FIELD_TYPES.TEXT,
    isTranslatable: true,
    configs: {
      label: 'Help Text'
    }
  },
  placeholder: {
    type: FIELD_TYPES.TEXT,
    isTranslatable: true,
    configs: {
      label: 'Placeholder'
    }
  },
  maxLength: {
    type: FIELD_TYPES.TEXT,
    configs: {
      label: 'Max Length',
      type: 'number'
    }
  },
  isRichText: {
    type: FIELD_TYPES.CHECKBOX,
    configs: {
      label: 'Enable Rich Text Editor'
    }
  },
}