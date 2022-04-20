import React from 'react';
import LinkIcon from '@material-ui/icons/Launch';

export default function VideoWrapper(props) {
  const renderLink = () => {
    if(props.data.config.href) {
      return (
        <div>
          <a href={props.data.config.href} target="_blank" rel="noopener noreferrer">
            <LinkIcon/>
          </a>
          <video className="ahfb-width-full" autoPlay={!!(props.data.config.autoPlay)} controls>
            <source src={props.data.config.url}/>
          </video>
        </div>
      )
    }
    return (
      <video className="ahfb-width-full" controls>
        <source src={props.data.config.url}/>
      </video>
    )
  }

  return (
    <div className="ahfb-width-full">
      {renderLink()}
    </div>
  )
}
