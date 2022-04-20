import React from 'react'
import { Tooltip } from '@material-ui/core'

export default function ImageWrapper(props) {
  const renderTooltip = () => {
    if(props.data.config.tooltip && props.data.config.tooltip !== '') {
      return (
        <Tooltip title={props.data.config.tooltip}>
        {renderLink()}
        </Tooltip>
      )
    } else {
      return renderLink();
    }
  }

  const renderLink = () => {
    if(props.data.config.href) {
      return (
        <a href={props.data.config.href} target="_blank" rel="noopener noreferrer">
          <img src={props.data.config.url} className="ahfb-img-wrapper-main" alt="Embedded Image"/>
        </a>
      )
    }
    return (
      <img src={props.data.config.url} className="ahfb-img-wrapper-main ahfb-width-full"/>
    )
  }

  return (
    <div className="ahfb-width-full">
      {renderTooltip()}
    </div>
  )
}
