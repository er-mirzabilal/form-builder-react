import { FIELD_TYPES } from '../../../../utils/Globals'

export const imageFieldsConfigs = {
  href: {
    type: FIELD_TYPES.TEXT,
    configs: {
      label: 'Link on image'
    }
  },
  tooltip: {
    type: FIELD_TYPES.TEXT,
    isTranslatable: true,
    configs: {
      label: 'Tooltip on image'
    }
  }
}