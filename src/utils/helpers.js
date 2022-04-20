import { v4 as uuidv4 } from 'uuid';
import * as sampleData from '../components/sampleFieldsData';

export const generateUUID = () => {
  return uuidv4();
}

export const stringToSlug = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();
  str = truncateWords(str, 4);

  // remove accents, swap ñ for n, etc
  let from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  let to   = "aaaaeeeeiiiioooouuuunc______";
  for (let i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '_') // collapse whitespace and replace by -
    .replace(/-+/g, '_'); // collapse dashes

  return str;
}

export const truncateWords = (str, noWords) => {
  return str.split(" ").splice(0,noWords).join(" ");
}

export const generateSampleData = (type, order) => {
  let uuid = generateUUID();
  let machineName = type + '-' + Math.round(Date.now()/1000);
  switch(type) {
    case 'text':
      return sampleData.textField(uuid, machineName, order);
    case 'select':
      return sampleData.selectField(uuid, machineName, order);
    case 'checkbox':
      return sampleData.checkboxField(uuid, machineName, order);
    case 'radio':
      return sampleData.radioField(uuid, machineName, order);
    case 'date':
      return sampleData.dateField(uuid, machineName, order);
    case 'file':
      return sampleData.fileField(uuid, machineName, order);
    case 'survey':
      return sampleData.surveyField(uuid, machineName, order);
    case 'quiz':
      return sampleData.quizField(uuid, machineName, order);
    case 'signature':
      return sampleData.signatureField(uuid, machineName, order);
    case 'content':
      return sampleData.contentField(uuid, machineName, order);
    case 'image':
      return sampleData.imageField(uuid, machineName, order);
    case 'video':
      return sampleData.videoField(uuid, machineName, order);
    case 'list':
      return sampleData.listField(uuid, machineName, order);
    case 'section':
      return sampleData.sectionField(uuid, machineName, order);
    default:
      return sampleData.textField(uuid, machineName, order);
  }
}

export const fileListToArray = (list) => {
  const array = [];
  for (let i = 0; i < list.length; i++) {
    array.push(list.item(i));
  }
  return array;
}

export const getHeight = (toolbar = false, hasTabs = true) => {
  let initial = 0;
  if(toolbar) {
    initial += 66;
  }
  if(hasTabs) {
    initial += 47;
  }
  return screen.height - initial - 180;
}

