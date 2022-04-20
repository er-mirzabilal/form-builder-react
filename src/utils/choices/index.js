import React, { useCallback, useEffect } from 'react'
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import DragIcon from '@material-ui/icons/DragIndicator';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import TextInput from "../inputs/TextInput";
import { Grid, List, ListItem, ListItemIcon } from '@material-ui/core'
import _ from 'lodash';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

import './style.scss';
import {stringToSlug} from "../helpers";
import ChoiceItem from "./ChoiceItem";
import { Scrollbars } from 'react-custom-scrollbars'
import axios from 'axios'
import { updateCategoryOptions } from '../../actions/predefinedActions'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  labelRoot: {
    transform: 'none'
  },

}));

function Choices(props) {
  const {error, required, label} = props;
  const [name, setName] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [index, setIndex] = React.useState(null);
  const [fieldFocus, setFieldFocus] = React.useState('name');
  const [labelError, setLabelError] = React.useState('');
  const [predefined, setPredefined] = React.useState({options: []});
  const classes = useStyles();
  let newField = false;
  // let predefined = {options: []};

  useEffect(()=>{
    if(props.optionReferenceId) {
      for(let i = 0; i < props.predefined.length; i++) {
        if(props.predefined[i].id === props.optionReferenceId) {
          setPredefined(props.predefined[i]);
          break;
        }
      }
    }
  },[props.predefined,props.optionReferenceId])


  if(predefined.options.length === 0) {
    newField = true;
  }

  const handleChange = (val, name) => {
    if(name === 'name') {
      setName(val);
      setFieldFocus(name);
    } else if(name === 'value') {
      setValue(val);
      setFieldFocus(name);
    } else {
      setIndex(val);
    }
    setLabelError('');
  }

  const addNewChoice = (e) => {
    e.preventDefault();
    actionPerformed()
      .then((resPredefined) => {
        let url = '/predefined';
        if(props.predefinedEndpoint) {
          url = props.predefinedEndpoint;
        }
        axios.post(url + '/' + resPredefined.id + '/options', {name, value, order: index})
          .then((res) => {
            props.updateCategoryOptions(res.data.options, resPredefined.slug);
            disableNewChoice();
            setFieldFocus('name')
          })
      })
  }

  const deleteChoice = (optionId) => {
    actionPerformed()
      .then((resPredefined) => {
        let url = '/predefined';
        if(props.predefinedEndpoint) {
          url = props.predefinedEndpoint;
        }
        axios.delete(url + '/' + resPredefined.id + '/options/' + optionId)
          .then((res) => {
            props.updateCategoryOptions(res.data.options, resPredefined.slug);
            disableNewChoice();
          })
      })
  }

  const disableNewChoice = () => {
    setValue(null);
    setName(null);
    setIndex(null);
  }

  const actionPerformed = () => {
    return new Promise((resolve, reject) => {
      if(predefined.is_public || !predefined.id) {
        props.disablePredefined()
          .then((res) => {
            resolve(res)
          })
      } else {
        resolve(predefined);
      }
    })
  }

  const updateChoice = (label, oldLabel) => {
    if(oldLabel !== label) {
      actionPerformed()
        .then((resPredefined) => {
          let newId = null;
          for (let i = 0; i < resPredefined.options.length; i++) {
            if (resPredefined.options[i].name === oldLabel) {
              newId = resPredefined.options[i].id;
              break;
            }
          }
          let url = '/predefined';
          if(props.predefinedEndpoint) {
            url = props.predefinedEndpoint;
          }
          axios.put(url + '/' + resPredefined.id + '/options', {
            optionId: newId,
            data: { name: label }
          }).then((res) => {
              props.updateCategoryOptions(res.data.options, resPredefined.slug);
              disableNewChoice();
            })
        });
    }
  }

  const renderAddChoice = () => {
    return (
      <form onSubmit={addNewChoice} className= "ahfb-ml-4 ahfb-width-full">
        <Grid container>
          <Grid item xs={5} className="ahfb-pr-1 ahfb-mr-1">
            <TextInput autoFocus={fieldFocus === 'name'}  placeholder="New Label" error={labelError} value={name} handleChange={e => handleChange(e.target.value, 'name')}/>
          </Grid>
          <Grid item xs={5} className="ahfb-px-1 ahfb-pr-4">
            <TextInput autoFocus={fieldFocus === 'value'}  placeholder="New Value" value={value} handleChange={e => handleChange(e.target.value, 'value')}/>
          </Grid>
          <Grid item xs={1} className="ahfb-d-flex">
            <IconButton size="small" onClick={addNewChoice} type="submit">
              <DoneIcon />
            </IconButton>
            {!(newField) ? (
              <IconButton size="small" onClick={disableNewChoice}>
                <CancelIcon />
              </IconButton>
            ) : ""}
          </Grid>
        </Grid>
      </form>
    )
  }
  const DragHandle = sortableHandle(() => <DragIcon className="ahfb-mt-4"/>);
  const renderChoice = (choice, listIndex) => {
      if(listIndex === index) {
        return (
          <React.Fragment>
            <ListItem disableGutters className="ahfb-py-0 ahfb-width-98p ahfb-my-2 ahfb-mx-4 " key={choice.id + '-new'}>
              {renderAddChoice()}
            </ListItem>
            <ListItem disableGutters className="ahfb-py-0 ahfb-width-98p" key={choice.id}>
              <ListItemIcon className="choices-drag-icon">
                <DragHandle />
              </ListItemIcon>
              <ChoiceItem inputProps label={choice.name} updateChoice={value => updateChoice(value, choice.name)} index={listIndex}/>
              <IconButton size="small" className="ahfb-mt-3" onClick={e => handleChange(listIndex+1, 'index')}><AddIcon/></IconButton>
              <IconButton size="small" className="ahfb-mt-3" onClick={e => deleteChoice(choice.id)}><RemoveIcon/></IconButton>
            </ListItem>
          </React.Fragment>
        )
      } else if(index === predefined.options.length && listIndex === predefined.options.length - 1) {
        return (
          <React.Fragment key={choice.name}>
            <ListItem disableGutters className="ahfb-py-0 ahfb-width-98p">
              <ListItemIcon className="choices-drag-icon">
                <DragHandle />
              </ListItemIcon>
              <ChoiceItem label={choice.name} updateChoice={value => updateChoice(value, choice.name)} index={listIndex}/>
              <IconButton size="small" className="ahfb-mt-3" onClick={e => handleChange(listIndex+1, 'index')}><AddIcon/></IconButton>
              <IconButton size="small" className="ahfb-mt-3" onClick={e => deleteChoice(choice.id)}><RemoveIcon/></IconButton>
            </ListItem>
            <ListItem disableGutters className="ahfb-py-0 ahfb-width-98p ahfb-my-2 ahfb-mx-4" key={choice.name + '-new'}>
              {renderAddChoice()}
            </ListItem>
          </React.Fragment>
        )
      } else {
        return (
          <ListItem disableGutters className="ahfb-py-0 ahfb-width-98p" key={choice.name}>
            <ListItemIcon className="choices-drag-icon">
              <DragHandle />
            </ListItemIcon>
            <ChoiceItem label={choice.name} updateChoice={value => updateChoice(value, choice.name)} index={listIndex}/>
            <IconButton size="small" className="ahfb-mt-3" onClick={e => handleChange(listIndex+1, 'index')}><AddIcon/></IconButton>
            <IconButton size="small" className="ahfb-mt-3" onClick={e => deleteChoice(choice.id)}><RemoveIcon/></IconButton>
          </ListItem>
        )
      }
  }
  const SortableItem = sortableElement(({ listIndex ,value }) => {
      return  renderChoice(value, listIndex);
  });
  const onSortEnd = ({oldIndex, newIndex}) =>{
      const sortedOptions = arrayMove(predefined.options,oldIndex, newIndex).map((option, index) =>{
        option.order = index;
        return option;
      });
      setPredefined({...predefined, options: sortedOptions});
        let url = '/predefined';
        if(props.predefinedEndpoint) {
          url = props.predefinedEndpoint;
        }
        axios.put(url + '/' + 'reorder-options/' +  props.optionReferenceId,{
          options: sortedOptions
        })
          .then((res) => {
            props.updateCategoryOptions(res.data.options, predefined.slug);
          })
  }
  const SortableContainer = sortableContainer(({children}) => {
    return  (
      <List>
            {children}
    </List>
    )
  });
  const renderChoices = () => {
    return(
      <SortableContainer onSortEnd={onSortEnd} useDragHandle>
        {predefined.options.map((choice, listIndex) => (
           <SortableItem key={`item-${choice.id}`} index={listIndex} listIndex={listIndex} value={choice}/>
        ))}
    </SortableContainer>
    )
  }

  return (
    <FormControl error={!!(error)} fullWidth={true}>
      <FormLabel required={required}>{label}</FormLabel>
      {(newField) ? <div className='ahfb-my-2 ahfb-mx-4'>{renderAddChoice()} </div> : renderChoices()}
      {!!(error) ? (
        <FormHelperText>{error}</FormHelperText>
      ) : ""}
    </FormControl>
  )
}

const mapStateToProps = state => ({
  predefinedEndpoint: state.form.predefinedEndpoint
})

const mapDispatchToProps = dispatch => ({
  updateCategoryOptions: (data, slug) => dispatch(updateCategoryOptions(data, slug))
})

export default connect(mapStateToProps, mapDispatchToProps)(Choices);