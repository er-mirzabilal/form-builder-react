import { FIELD_TYPES } from '../../../../utils/Globals'

export const fileUploadFieldsConfigs = {
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
  }
}