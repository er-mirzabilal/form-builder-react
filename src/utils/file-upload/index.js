import React, {useRef} from 'react';
import {InputLabel, Typography, Button, Box, LinearProgress} from "@material-ui/core";
import './style.scss';
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from 'axios';
import { fileListToArray } from '../helpers'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  highlight: {
    border: '2px dashed',
    borderColor: theme.palette.primary.main
  }
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" style={{height: 10}} {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function FileUpload(props) {
  const fileUploader = useRef(null);
  const [highlight, setHightlight] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const classes = useStyles();

  const onDragOver = (evt) => {
    evt.preventDefault();
    setHightlight(true);
  }

  const onDragLeave = () => {
    setHightlight(false);
  }

  const onDrop = (event) => {
    event.preventDefault();
    setHightlight(false);
    if(props.uploadable) {
      setUploading(true);
      const files = event.dataTransfer.files;
      uploadFile(files);
    }
  }

  const onFilesAdded = (e) => {
    if(props.uploadable) {
      setUploading(true);
      const files = e.target.files;
      uploadFile(files);
    }
  }

  const openBrowser = () => {
    fileUploader.current.click();
  }

  const validateExtensions = (file) => {
    if(props.variant) {
      let parts = file.name.split('.');
      let extension = parts[parts.length - 1];
      if(props.variant === 'images' && !(['jpg', 'jpeg', 'png', 'gif', 'JPG', 'PNG', 'GIF', 'JPEG'].includes(extension))) {
        setError('Invalid file format. Please use one of these: jpg, jpeg, png, gif');
        return false;
      } else if(props.variant === 'videos' && !(['mp4', 'webm', 'ogg', 'MP4', 'WEBM', 'OGG'].includes(extension))) {
        setError('Invalid file format. Please use one of these: mp4, webm, ogg');
        return false;
      }
    }
    return true;
  }

  const uploadFile = (files) => {
    setError(null);
    const array = fileListToArray(files);
    if(array.length > 1) {
      setError('Only one file is allowed')
    } else {
      if(validateExtensions(array[0])) {
        const config = {
          onUploadProgress: progressEvent => setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }
        let formData = new FormData();
        formData.append('file', array[0]);
        formData.append('provider', 'true');
        axios.post(props.fileUploadUrl, formData, config)
          .then((res) => {
            props.updateUrl(res.data.path);
            setUploading(false)
            setProgress(0);
          }).catch((err) => {
            if(err.response.status) {
              setError('Invalid file format');
            } else {
              setError('Unable to upload file, try again later');
            }
            setUploading(false)
            setProgress(0);
          })
      } else {
        setUploading(false)
        setProgress(0);
      }
    }
  }

  const renderImage = () => {
    if(props.url && props.url !== '') {
      return (
        <img src={props.url} className="ahfb-width-full ahfb-file-upload-preview"/>
      )
    } else {
      return (
        <img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png" width="100"/>
      )
    }
  }

  const renderVideo = () => {
    if(props.url && props.url !== '') {
      return (
        <video className="ahfb-width-full ahfb-file-upload-preview" controls>
          <source src={props.url}/>
        </video>
      )
    } else {
      return (
        <img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png" width="100"/>
      )
    }
  }

  const renderDropzone = () => {
    let className = 'ahfb-dropzone';
    if(uploading) {
      if(props.url && props.url !== '') {
        className += ' ahfb-pt-0';
      }
      return (
        <div
          className={className}
        >
          {(props.variant === 'images') ? renderImage() : renderVideo()}
          <div className="ahfb-width-full ahfb-pl-3 ahfb-pr-2 ahfb-pt-3">
            <LinearProgressWithLabel value={progress}/>
          </div>
        </div>
      )
    } else {
      if(props.url && props.url !== '') {
        className += ' ahfb-pt-0';
      }
      if(highlight) {
        className += ' ' + classes.highlight;
      }
      return (
        <div
          className={className}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {(props.variant === 'images') ? renderImage() : renderVideo()}
          <Typography variant="h6" className="ahfb-dropzone-label">{(props.placeholder) ? props.placeholder : 'Drag and drop files here'}</Typography>
          <InputLabel>or</InputLabel>
          <Button variant="outlined" color="primary" onClick={openBrowser}>{(props.url && props.url !== '') ? 'Replace File' : 'Browse Files'}</Button>
        </div>
      )
    }
  }

  return (
    <div>
      <InputLabel required={props.required}>{props.label}</InputLabel>
      <input type="file" id="file" multiple={!!(props.isMultiple)} ref={fileUploader} className="ahfb-hidden" onChange={onFilesAdded}/>
      {renderDropzone()}
      <FormHelperText>{props.helperText}</FormHelperText>
      {(error) ? (
        <FormHelperText error>{error}</FormHelperText>
      ) : ""}
    </div>
  )
}