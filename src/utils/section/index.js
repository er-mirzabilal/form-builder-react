import React,{useState} from 'react';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider'
import Wrapper from '../../components/app/FieldWrapper';
import _ from 'lodash';


function Section(props) {
  const {name,uuid,collapseable} = props;
  const [expand,setExpand] = useState(true)
  
  const renderFields = ()=>{
    let fields = Object.values(props.data);
    const sectionFields = fields.filter(field =>{
      if(field.parentId === uuid) return true;
      return false;
    })
    if(!sectionFields.length) return (<div style={{textAlign: 'center'}}><small> Drop fields here</small></div>);
    return _.map(sectionFields, (field, index) => {
        return (
          <ExpansionPanelDetails style={{padding:0}}>
              <div  style={{width:'100%'}}>
              <li key={'li-' + field.uuid} className="d-block container-fluid" >
              <Wrapper data={field} key={field.uuid} />
            </li>
            </div>
        </ExpansionPanelDetails>
        )
    })

  }
  const handleChange = ()=>{
    if(collapseable) setExpand(!expand);
  }
  return (
    <div style ={{marginTop:10}}>
      <ExpansionPanel 
          elevation={0} 
          onChange={handleChange}
          expanded={expand}
          >
        <ExpansionPanelSummary
          expandIcon={collapseable?<ExpandMoreIcon />:''}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{padding:0}}
          >
          <Typography >{name}</Typography>
        </ExpansionPanelSummary>
        {expand?(<hr/>):''}
          {renderFields()}
        </ExpansionPanel>
         </div>
  );
}
const mapStateToProps = state => ({
  data: state.form.data,
  order: state.form.order

})
const mapDispatchToProps = dispatch => ({
  setOrder: (data) => dispatch(setOrder(data))

})
export default connect(mapStateToProps)(Section);
 