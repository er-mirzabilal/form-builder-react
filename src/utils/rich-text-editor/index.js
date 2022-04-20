import React from 'react';
import CKEditor from 'ckeditor4-react';
import FormHelperText from '@material-ui/core/FormHelperText'

export default function RichTextEditor(props) {
  const config = {
    toolbarGroups: [
      { name: 'document', groups: [ 'doctools' ] },
      { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
      { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
      { name: 'forms', groups: [ 'forms' ] },
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
      { name: 'links', groups: [ 'links' ] },
      { name: 'insert', groups: [ 'insert' ] },
      { name: 'styles', groups: [ 'styles' ] },
      { name: 'colors', groups: [ 'colors' ] },
      { name: 'tools', groups: [ 'tools' ] },
      { name: 'others', groups: [ 'others' ] },
      { name: 'about', groups: [ 'about' ] }
    ],
    removeButtons: 'Save,NewPage,Preview,Print,Cut,Copy,Paste,PasteText,Undo,Redo,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Superscript,CopyFormatting,RemoveFormat,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Image,Flash,Table,Smiley,PageBreak,ShowBlocks,About'
  }

  const onEditorChange = (evt) => {
    props.handleChange(evt.editor.getData());
  }

  return (
    <div>
      <CKEditor
        data={props.data}
        onChange={onEditorChange}
        config={config}
      />
      {(props.error && props.error !== '') ? (
        <FormHelperText error>{props.error}</FormHelperText>
      ) : ""}
    </div>
  )
}