import React, {Component} from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  setInitialData,
  setPredefinedValues,
  setPredefinedEndpoint,
  setFileUploadUrl,
  setOrder, setConditionableFields,
  createField,
  setLocals,
  setTheme
} from '../../actions/formActions'
import MainLayout from '../../layouts/Main';
import predefined from '../../predefined-values';
import './App.scss';
import _ from 'lodash';
import axios from 'axios';
import Wrapper from './FieldWrapper';
import DroppableField from './DroppableField';
import { Scrollbars } from 'react-custom-scrollbars';
import { getHeight,generateSampleData } from '../../utils/helpers'

const compare = ( a, b ) => {
  if ( a.order < b.order ){
    return -1;
  }
  if ( a.order > b.order ){
    return 1;
  }
  return 0;
}



class App extends Component {
  constructor(props) {
    super(props);
    this.fields = {};
    this.state = {
      loading: true,
      onDropExistingField:false

    };
    this.onDragItem = null;
    this.onDropItem = null;
  }
  componentDidMount() {
    if(this.props.conditionableFields) {
      this.props.setConditionableFields(this.props.conditionableFields);
    }
    if(_.size(this.props.formData)) {
      let order = 1;
      _.map(this.props.formData, (field) => {
        if(field.order > order) {
          order = field.order;
        }
      })
      this.props.setOrder(order+1);
    }
    if(this.props.predefinedEndpoint) {
      axios.get(this.props.predefinedEndpoint)
        .then((res) => {
          this.props.setPredefinedValues(res.data);
          this.setState({
            loading: false
          }, () => {
            this.props.setPredefinedEndpoint(this.props.predefinedEndpoint);
            this.props.setFileUploadUrl(this.props.fileUploadUrl);
            this.props.setInitialData(this.props.formData);
          })
        }).catch((err) => {
          this.props.setPredefinedValues([]);
          this.setState({
            loading: false
          })
          console.error('Unable to fetch predefined options from ' + this.props.predefinedEndPoint);
      })
    }

    if (this.props.locals) {
      this.props.setLocals(this.props.locals)
    }

    if (this.props.theme) {
      this.props.setTheme(this.props.theme);
    }

    this.props.initializeSubmit(this.submitForm);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.theme.direction !== this.props.theme.direction) {
      this.props.setTheme(this.props.theme);
    }
  }

  handleOnDragStart = (index)=>{
    this.onDragItem = index;
    this.setState({
      ...this.state,
      onDragExisitingField: true
    })
    }

  handleOnDrop = (index,type,uuid,order,event, callback) =>{
    event.stopPropagation();
    let droppedFieldSlug = event.dataTransfer.getData('droppedFieldSlug');
    if(droppedFieldSlug){
      if(type === 'section' && droppedFieldSlug !== 'section'){
        let data = generateSampleData(droppedFieldSlug,order);
        data.parentId = uuid;
        this.props.createField(data); 
      }
    }     
    else{
      this.onDropItem = index;
      this.reorderFields(this.onDragItem,this.onDropItem)
      callback?callback():null;
      this.setState({
        ...this.state,
        onDragExisitingField: false
      })
    }
  }
 
  handleFieldDrop = (e) =>{
    e.preventDefault();
      let droppedFieldSlug = e.dataTransfer.getData('droppedFieldSlug');
      if(droppedFieldSlug){
        let data = generateSampleData(droppedFieldSlug, this.props.order);
        this.props.createField(data); 
    }
  }
  handleFieldDropBtw = (e,order,callback) =>{
    e.stopPropagation();   
    let droppedFieldSlug = e.dataTransfer.getData('droppedFieldSlug');
    if(droppedFieldSlug){
      let data = generateSampleData(droppedFieldSlug, order);
      this.props.createField(data); 
    }  
    callback();
  }
  renderFields = () => {
    //  this.fields  = this.fields.filter(field =>{
    //   if(field.parentId) return false;
    //   return true;
    // })
    let count = 0;
    let total = this.fields.length;
    return _.map(this.fields, (field, index) => {
      count++;
      let droppableField = (<DroppableField onDrop={this.handleFieldDropBtw} order={field.order} />);
      if (this.state.onDragExisitingField) {
        droppableField = (<DroppableField onDragExisitingField onDrop={this.handleOnDrop} data={{index:index, field}} />);
      }
      if(count ===  total) {
        const lastDroppableField =(<DroppableField onDragExisitingField onDrop={this.handleOnDrop} data={{index:index+1, field}} />);
         return (
          [droppableField,
            <div key={index} draggable="true"
                 onDragStart={() => this.handleOnDragStart(index)}
              // onDrop={(e) => this.handleOnDrop(index,field.type,field.uuid,field.order,e)}
                 onDragOver={(event) => event.preventDefault()}
            >
              <li key={'li-' + field.uuid} className="ahfb-d-block" >
                <Wrapper data={field} key={field.uuid} first={(count === 1)} last={(count === total)}/>
              </li>
            </div>,
            lastDroppableField
          ]
        )
      }
      return (
        [droppableField,
        <div draggable="true"
         onDragStart={() => this.handleOnDragStart(index)}
          // onDrop={(e) => this.handleOnDrop(index,field.type,field.uuid,field.order,e)}
          onDragOver={(event) => event.preventDefault()}
          >
        <li key={'li-' + field.uuid} className="ahfb-d-block" >
          <Wrapper data={field} key={field.uuid} first={(count === 1)} last={(count === total)}/>
        </li>
        </div>
        ]

      )
    })
  }

  submitForm = () => {
    this.props.onSubmit(this.props.data);
  }

  reorderFields = ( previousIndex, nextIndex) => {
    if(previousIndex < nextIndex){
      let dragItem = this.fields.splice(previousIndex,1);
      console.log('sorting', dragItem, this.fields);
      this.fields.splice(nextIndex-1,0,...dragItem);
      console.log('after slice', this.fields);
    }
    else{
      console.log('before', this.fields);
      let dragItem = this.fields.splice(previousIndex,1);
      console.log('drag item', dragItem);
      this.fields.splice(nextIndex,0,...dragItem);
    }

    console.log('after sorting', this.fields);
    let data = {};
    this.fields.map((field, index) => {
      field.order = index + 1;
      data[field.uuid] = field;
    })
    this.props.setInitialData(data);
  }

  render() {
    if(this.state.loading) {
      return (
        <MainLayout>
          <div className="ahfb-width-full ahfb-text-center ahfb-pt-5">
            <CircularProgress/>
          </div>
        </MainLayout>
      )
    }
    if (_.size(this.props.data) > 0) {
      this.fields = Object.values(this.props.data);
      this.fields.sort(compare);
      return (
        <MainLayout>
            <div className="ahfb-content-pane-main ahfb-position-relative"
             onDragOver={(e) => e.preventDefault()}
             onDrop={(e)=>this.handleFieldDrop(e)}>
              <Scrollbars style={{height: getHeight()}} hideTracksWhenNotNeeded={true} autoHide>
                {this.renderFields()}
              </Scrollbars>
              <div className="ahfb-width-full ahfb-p-2">
              </div>
            </div>
        </MainLayout>
      );
    } else {
      return (
        <MainLayout>
          <div className="ahfb-content-pane-main ahfb-droppable-border" style={{height: getHeight()}}
           onDragOver={(e) => e.preventDefault()}
           onDrop={(e)=>this.handleFieldDrop(e)}>
           <p className="ahfb-pt-5 ahfb-text-center ahfb-text-muted">Looks like there are no fields in this form</p>
          </div>
        </MainLayout>
      );
    }
  }
}
const mapStateToProps = state => ({
  data: state.form.data,
  order: state.form.order

})

const mapDispatchToProps = dispatch => ({
  setPredefinedValues: (data) => dispatch(setPredefinedValues(data)),
  setPredefinedEndpoint: (data) => dispatch(setPredefinedEndpoint(data)),
  setFileUploadUrl: (data) => dispatch(setFileUploadUrl(data)),
  setInitialData: (data) => dispatch(setInitialData(data)),
  setConditionableFields: (data) => dispatch(setConditionableFields(data)),
  setOrder: (data) => dispatch(setOrder(data)),
  createField: (data) => dispatch(createField(data)),
  setLocals: (data) => dispatch(setLocals(data)),
  setTheme: (data) => dispatch(setTheme(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);