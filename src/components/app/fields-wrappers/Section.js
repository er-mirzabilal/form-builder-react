import React from 'react'
import Section from "../../../utils/section";
export default function sectionWrapper(props) {

  return (
      <Section  name={props.data.name} uuid={props.data.uuid}  collapseable={props.data.config.collapseable}/>
  )
}
