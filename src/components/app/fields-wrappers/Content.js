import React from 'react'
import './content.css'
export default function ContentWrapper(props) {
  return (
    <div className="clearfix">
      <div dangerouslySetInnerHTML={{ __html: props.data.config.content }}/>
    </div>
  )
}
