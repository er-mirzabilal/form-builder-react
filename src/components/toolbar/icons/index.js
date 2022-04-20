import React from 'react';
import CheckboxGroup from './CheckboxGroup';
import Content from './Content';
import Date from './Date';
import FileUpload from './FileUpload';
import Image from './Image';
import List from './List';
import Quiz from './Quiz';
import Section from './Section';
import Select from './Select';
import Signature from './Signature';
import Survey from './Survey';
import TextField from './TextField';
import Video from './Video';

const Index = props => {
  switch(props.name) {
    case "checkbox":
      return <CheckboxGroup height="30px" width="30px" {...props} />;
    case "content":
      return <Content height="30px" width="30px" {...props} />;
    case "date":
      return <Date height="30px" width="30px" {...props} />;
    case "file-upload":
      return <FileUpload height="30px" width="30px" {...props} />;
    case "image":
      return <Image height="30px" width="30px" {...props} />;
    case "list":
      return <List height="30px" width="30px" {...props} />;
    case "quiz":
      return <Quiz height="30px" width="30px" {...props} />;
    case "section":
      return <Section height="30px" width="30px" {...props} />;
    case "select":
      return <Select height="30px" width="30px" {...props} />;
    case "signature":
      return <Signature height="30px" width="30px" {...props} />;
    case "survey":
      return <Survey height="30px" width="30px" {...props} />;
    case "text":
      return <TextField height="30px" width="30px" {...props} />;
    case "video":
      return <Video height="30px" width="30px" {...props} />;
    default:
      return <div />;
  }
}
export default Index;