export const basicData = (type, uuid, machineName, order) => {
  return {
    machineName: machineName,
    uuid: uuid,
    name: '',
    type: type,
    order: order,
    parentId: 0
  };
};

export const textField = (uuid, machineName, order) => {
  let data = basicData("text", uuid, machineName, order);
  data.config = {
    isRequired: false,
    isRichText: false,
    isConditionalEnabled: false,
    conditionalLogic: {
      display: 'show',
      logic: 'all',
      conditions: []
    },
    maxLength: '',
    placeholder: '',
    helpText: '',
    subType: 'text',
    regex: '',
    regexErrMsg: 'You have entered an invalid value',
    visibility: true,
  };
  return data;
};

export const checkboxField = (uuid, machineName, order) => {
  let data = basicData("checkbox", uuid, machineName, order);
  data.config = {
    isRequired: false,
    isConditionalEnabled: false,
    conditionalLogic: {
      display: 'show',
      logic: 'all',
      conditions: []
    },
    enableOther: false,
    helpText: null,
    subType: "checkbox",
    visibility: true,
    optionReferenceId: null
  };
  return data;
};

export const radioField = (uuid, machineName, order) => {
  let data = basicData("radio", uuid, machineName, order);
  data.config = {
    isRequired: false,
    isConditionalEnabled: false,
    conditionalLogic: {
      display: 'show',
      logic: 'all',
      conditions: []
    },
    enableOther: false,
    helpText: null,
    subType: "radio",
    visibility: true,
    optionReferenceId: null
  };
  return data;
};

export const contentField = (uuid, machineName, order) => {
  let data = basicData("content", uuid, machineName, order);
  data.config = {
    subType: "content",
    content: null,
    visibility: true
  };
  return data;
};

export const dateField = (uuid, machineName, order) => {
  let data = basicData("date", uuid, machineName, order);
  data.config = {
    isRequired: false,
    helpText: null,
    subType: "date",
    isConditionalEnabled: false,
    visibility: true,
    conditionalLogic: {
      display: 'show',
      logic: 'all',
      conditions: []
    },
    shouldDateValidate: false,
    dateValidations: {
      pastUnit: 'days',
      pastMax: 0,
      pastMin: 0,
      futureUnit: 'days',
      futureMax: 0,
      futureMin: 0
    }
  };
  return data;
};

export const fileField = (uuid, machineName, order) => {
  let data = basicData("file", uuid, machineName, order);
  data.config = {
    isRequired: false,
    isMultiple: false,
    isConditionalEnabled: false,
    conditionalLogic: {
      display: 'show',
      logic: 'all',
      conditions: []
    },
    supportedFiles: [],
    placeholder: 'Drag and drop files here',
    helpText: null,
    subType: "file",
    visibility: true
  };
  return data;
};

export const imageField = (uuid, machineName, order) => {
  let data = basicData("image", uuid, machineName, order);
  data.config = {
    url: '',
    href: '',
    tooltip: '',
    subType: "image",
    visibility: true
  };
  return data;
};

export const listField = (uuid, machineName, order) => {
  let data = basicData("list", uuid, machineName, order);
  data.config = {
    isRequired: false,
    isRichText: false,
    isConditionalEnabled: false,
    visibility: true,
    conditionalLogic: {
      display: 'show',
      logic: 'all',
      conditions: []
    },
    maxLength: 0,
    placeholder: null,
    helpText: null,
    subType: "list",
    regex: null
  };
  return data;
};

export const quizField = (uuid, machineName, order) => {
  let data = basicData("quiz", uuid, machineName, order);
  data.config = {
    isRequired: false,
    randomize: false,
    isConditionalEnabled: false,
    conditionalLogic: {
      display: 'show',
      logic: 'all',
      conditions: []
    },
    visibility: true,
    allowExplantion: false,
    subType: "quiz",
    answers: {
      order: {
        label: null,
        isCorrect: false
      }
    }
  };

  return data;
};

export const selectField = (uuid, machineName, order) => {
  let data = basicData("select", uuid, machineName, order);
  data.config = {
    isRequired: false,
    isConditionalEnabled: false,
    conditionalLogic: {
      display: 'show',
      logic: 'all',
      conditions: []
    },
    visibility: true,
    enableOther: false,
    isMultiple: false,
    placeholder: '',
    helpText: '',
    subType: "select",
    optionReferenceId: null
  };
  return data;
};

export const signatureField = (uuid, machineName, order) => {
  let data = basicData("signature", uuid, machineName, order);
  data.config = {
    isRequired: false,
    isConditionalEnabled: false,
    visibility: true,
    conditionalLogic: {
      display: 'show',
      logic: 'all',
      conditions: []
    },
    helpText: null,
    subType: "signature"
  };
  return data;
};

export const surveyField = (uuid, machineName, order) => {
  let data = basicData("survey", uuid, machineName, order);
  data.config = {
    isRequired: false,
    isConditionalEnabled: false,
    conditionalLogic: {
      display: 'show',
      logic: 'all',
      conditions: []
    },
    questionType: 0,
    allowMultiple: false,
    helpText: null,
    subType: "survey",
    visibility: true,
  };
  return data;
};

export const videoField = (uuid, machineName, order) => {
  let data = basicData("video", uuid, machineName, order);
  data.config = {
    autoPlay: false,
    url: '',
    href: '',
    subType: "video",
    visibility: true,
  };
  return data;
};
export const sectionField = (uuid, machineName, order) => {
  let data = basicData("section", uuid, machineName, order);
  data.config = {
    isConditionalEnabled: false,
    conditionalLogic: {
      display: 'show',
      logic: 'all',
      conditions: []
    },
    subType:'simple',
    collapseable:true,
    columns:'1',
    visibility: true,
  };
  return data;
};