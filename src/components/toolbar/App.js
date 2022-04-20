import React from 'react';
import Drawer from "./Drawer";
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Icon from './icons'
import config from '../../config';
import './styles.scss';
import {generateSampleData} from "../../utils/helpers";
import {connect} from "react-redux";
import {enableFieldEdit} from "../../actions/toolbarActions";
import { createField, setOrder } from '../../actions/formActions'
import EditField from "./EditField";
import { Grid } from '@material-ui/core'

const fields = [
  {label: 'Text Field', slug: 'text', 'icon': <Icon name="text"/>},
  {label: 'Select / Dropdown', slug: 'select', 'icon': <Icon name="select"/>},
  {label: 'Checkbox Group', slug: 'checkbox', 'icon': <Icon name="checkbox"/>},
  {label: 'Radio Group', slug: 'radio', 'icon': <Icon name="checkbox"/>},
  {label: 'Date Field', slug: 'date', 'icon': <Icon name="date"/>},
  {label: 'Content', slug: 'content', 'icon': <Icon name="content"/>},
  {label: 'File Upload', slug: 'file', 'icon': <Icon name="file-upload"/>},
  {label: 'Quiz', slug: 'quiz', 'icon': <Icon name="quiz"/>},
  {label: 'Survey', slug: 'survey', 'icon': <Icon name="survey"/>},
  {label: 'List', slug: 'list', 'icon': <Icon name="list"/>},
  {label: 'E-Signature', slug: 'signature', 'icon': <Icon name="signature"/>},
  {label: 'Image', slug: 'image', 'icon': <Icon name="image"/>},
  {label: 'Video', slug: 'video', 'icon': <Icon name="video"/>},
  {label: 'Section', slug: 'section', 'icon': <Icon name="section"/>}
]

class App extends React.Component {

  addNewField = (slug) => {
    let data = generateSampleData(slug, this.props.order);
    this.props.createField(data);
  }
  onDragStart = (e,slug) => {
    e.dataTransfer.setData("droppedFieldSlug",slug );
  }
  onDragEnd = (e) =>{
    e.dataTransfer.setData("droppedFieldSlug",null);
  }

  renderFieldItems = () => {
    let count = -1;
    return fields.map((field, index) => {
      if(config.hiddenFields.indexOf(field.slug) === -1) {
        count++;
        return (
            <Grid item md={6} xs={12} className={(count % 2 === 0) ? "ahfb-pt-3 ahfb-pr-1" : "ahfb-pt-3 ahfb-pl-1"} key={'field-' + field.slug}
              onDragStart ={(e)=>this.onDragStart(e,field.slug)}
              onDragOver={(e)=>e.preventDefault()}
              onDragEnd={(e)=>this.onDragEnd(e)}
            >
              <ListItem button className="ahfb-p-0">
              <div className="ahfb-field-type-container ahfb-pt-3 ahfb-cursor-pointer" onDoubleClick={e => this.addNewField(field.slug)}
                draggable ="true"
                onDragStart ={(e)=>this.onDragStart(e,field.slug)}
                 onDragOver={(e)=>e.preventDefault()}
              >
                {field.icon}
                <Typography variant="subtitle1" gutterBottom>
                  {field.label}
                </Typography>
              </div>
              </ListItem>
            </Grid>

        )
      }
      return '';
    })
  }

  render() {

    if(this.props.editId || this.props.newFieldData) {
      return (
        <div>
          <Drawer title="Question Types">
            <div className="ahfb-m-0">
              <EditField/>
            </div>
          </Drawer>
        </div>
      )
    }
    return (
      <div>
        <Drawer title="Question Types" type='fields'>
          <Grid container className="ahfb-p-2">
            {this.renderFieldItems()}
          </Grid>
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  newFieldData: state.form.newFieldData,
  editId: state.toolbar.editId,
  data: state.form.data,
  order: state.form.order
})

const mapDispatchToProps = dispatch => ({
  enableFieldEdit: (id, operation) => dispatch(enableFieldEdit(id, operation)),
  createField: (data) => dispatch(createField(data)),
  setOrder: (data) => dispatch(setOrder(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);