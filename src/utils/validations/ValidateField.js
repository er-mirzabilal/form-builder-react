export default (field, fields) => {
  return new Promise((resolve, reject) => {
    let errors = {};
    let machineNames = _.map(fields, (field, uuid) => {
      if(uuid !== field.uuid) {
        return field.machineName;
      }
    })
    if(['text', 'select', 'checkbox', 'radio', 'date', 'file', 'survey', 'quiz', 'signature', 'list','section'].includes(field.type)) {
      if(!field.name || field.name === '') {
        errors.name = 'Name is required';
      }
      if(!field.machineName || field.machineName === '') {
        errors.machineName = 'Machine Name is required';
      } else if(machineNames.includes(field.machineName)) {
        errors.machineName = 'This Machine Name already exists';
      }
      if(field.config.isConditionalEnabled) {
        let conditionErrors = validateConditional(field.config.conditionalLogic.conditions);
        if(conditionErrors.length) {
          errors.conditionalLogic = conditionErrors;
        }
      }
      if(field.type === 'text' && field.config.regex && field.config.regex !== '') {
        try {
          new RegExp(field.config.regex);
        } catch(e) {
          errors.regex = 'Regex is not valid';
        }
      }
    }

    if(field.type === 'content') {
      if(!field.config.content || field.config.content === '') {
        errors.content = 'Content is required';
      }
    }

    if(field.type === 'select' || field.type === 'checkbox' || field.type === 'radio') {
      if(!field.config.optionReferenceId) {
        errors.options = 'Options are required';
      }
    }

    if(field.type === 'image' || field.type === 'video') {
      if(!field.config.url || field.config.url === '') {
        errors.upload = 'Url or file upload is required';
      } else if(!validURL(field.config.url)) {
        errors.url = 'Url is not valid';
      }
    }
    if(field?.config?.shouldDateValidate && field?.config?.dateValidations){
      const dateValidation = field.config.dateValidations;
      const dateErrors = {};
       const pastLimitValidation = validateDateLimits(parseInt(dateValidation.pastMin), parseInt(dateValidation.pastMax));
       const futureLimitValidation = validateDateLimits(parseInt(dateValidation.futureMin), parseInt(dateValidation.futureMax));
       if(Object.keys(pastLimitValidation).length) dateErrors.pastLimitValidation = pastLimitValidation;
       if(Object.keys(futureLimitValidation).length) dateErrors.futureLimitValidation = futureLimitValidation;

       if(Object.keys(dateErrors).length)
        errors.dateErrors = dateErrors;
    }

    if(_.size(errors)) {
      reject(errors);
    } else {
      resolve({});
    }
  })
}
const validateDateLimits = (min,max) =>{
  const dateLimitErrors = {};
  if(min>= 0 ){
    if(min > max) dateLimitErrors.min= 'Min Should be less than max'
  }
  else {
    dateLimitErrors.min= 'min must be greater than zero';
  }
  if(max >= 0){
    if(max < min) dateLimitErrors.max= 'Max Should be greater than min'
  }
  else {
    dateLimitErrors.max = 'max must be greater than zero';
  }
  return dateLimitErrors;
}
const validateConditional = (conditions) => {
  let errors = [];
  conditions.map((condition, index) => {
    errors[index] = {};
    if(!condition.field) {
      errors[index].field = 'Field is required';
    }
    if(!condition.operator) {
      errors[index].operator = 'Operator is required';
    }
    if(!condition.value || condition.value === '') {
      errors[index].value = 'Value is required';
    }
    if(_.size(errors[index]) === 0) {
      delete errors[index];
    }
  })
  errors = errors.filter(function (el) {
    return el != null;
  });
  return errors;
}

const validURL = (str) => {
  let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}