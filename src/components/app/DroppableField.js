import React,{useEffect,useState} from 'react';

export default (props) =>{
  const [dragOver,setDragOver] = useState(false);
  const onDragOver = (e)=>{
    e.preventDefault();
    setDragOver(true);
  }
  const onDragLeave = (e)=>{
    setDragOver(false);
  }
  const dropCallback = ()=>{
    setDragOver(false);
  }
  if(props.onDragExisitingField){
    return(
      <div
        onDragOver={(e) =>{onDragOver(e)}}
        onDrop={(e)=>{props.onDrop(props.data.index,props.data.field.type, props.data.field.uuid, props.data.field.order,e ,dropCallback)}}
        onDragLeave={(e)=>{onDragLeave(e)}}
      >
        <div className={dragOver?" droppable-border-active ":''} style={{height:dragOver?70:10}}></div>
      </div>
    )
  }
  return (
    <div 
      onDragOver={(e) =>{onDragOver(e)}}
      onDrop={(e)=>{props.onDrop(e,props.order,dropCallback)}}
      onDragLeave={(e)=>{onDragLeave(e)}}
      >
        <div className={dragOver?" droppable-border-active ":''} style={{height:dragOver?70:10}}></div>
    </div>
  )
}