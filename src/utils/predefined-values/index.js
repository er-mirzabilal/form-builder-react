import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Grid, Tooltip } from '@material-ui/core'
import Snackbar from "@material-ui/core/Snackbar";

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

import _ from 'lodash';
import axios from 'axios';
import {connect} from "react-redux";

import './style.scss';
import NewCategory from "./NewCategory";
import { addCategory, updateCategoryOptions } from '../../actions/predefinedActions'
import {stringToSlug} from "../helpers";
import NewOption from "./NewOption";
import FormHelperText from '@material-ui/core/FormHelperText'

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

class PredefinedValues extends React.Component{
  constructor(props) {
    super(props);
    let active = null;
    if(props.selected) {
      for(let i = 0; i < props.predefined.length; i++) {
        if(props.predefined[i].id === this.props.selected) {
          active = props.predefined[i];
          break;
        }
      }
    }
    this.state = {
      open: false,
      activeCategory: active,
      addCategory: false,
      newCategoryName: '',
      showAddCategoryMsg: false,
      insertError: null
    }
  }

  handleAddCategoryMsgClose = () => {
    this.setState({
      showAddCategoryMsg: false
    })
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  handleInsert = () => {
    if(this.state.activeCategory) {
      this.props.insertChoices(this.state.activeCategory.id);
      this.handleClose();
    } else {
      this.setState({
        insertError: "Select a category to insert options"
      })
    }
  }

  enableCategory = (category) => {
    this.setState({
      activeCategory: category,
      insertError: null
    })
  }

  handleAddCategoryOpen = () => {
    this.setState({
      addCategory: true
    })
  }

  handleAddCategoryClose = () => {
    this.setState({
      addCategory: false,
    })
  }

  saveNewCategory = (categoryName) => {
    let slug = stringToSlug(categoryName);
    let data = {options: [], label: categoryName};
    axios.post(this.props.predefinedEndpoint, {name: categoryName, slug, isPublic: true})
      .then((res) => {
        this.props.addCategory(res.data);
        this.setState({
          addCategory: false,
          showAddCategoryMsg: true
        })
      })
  }

  saveNewCategoryOption = (name, value) => {
    axios.post(this.props.predefinedEndpoint + '/' + this.state.activeCategory.id + '/options', {name, value})
      .then((res) => {
        this.props.updateCategoryOptions(res.data.options, this.state.activeCategory.slug);
        this.setState({
          activeCategory: {
            ...this.state.activeCategory,
            options: res.data.options
          }
        })
      })
  }

  deleteOption = (option) => {
    axios.delete(this.props.predefinedEndpoint + '/' + this.state.activeCategory.id + '/options/' + option.id)
      .then((res) => {
        this.props.updateCategoryOptions(res.data.options, this.state.activeCategory.slug);
        this.setState({
          activeCategory: {
            ...this.state.activeCategory,
            options: res.data.options
          }
        })
      })
  }

  renderAddCategory = () => {
    if(this.state.addCategory) {
      return (
        <NewCategory names={_.map(this.props.predefined, (item) => item.name.toLowerCase())} saveNewCategory={this.saveNewCategory} handleAddCategoryClose={this.handleAddCategoryClose}/>
      )
    }
  }

  renderAddOption = () => {
    if(this.state.activeCategory && !this.state.activeCategory.is_secure) {
      return (
        <NewOption saveNewCategoryOption={this.saveNewCategoryOption} options={this.state.activeCategory.options}/>
      )
    }
  }

  renderCategories = () => {
    if(_.size(this.props.predefined)) {
      return _.map(this.props.predefined, (category) => {
        if(category.is_public) {
          return (
            <ListItem key={'category-' + category.slug} button selected={(this.state.activeCategory && this.state.activeCategory.slug === category.slug)} onClick={e => this.enableCategory(category)}>
              <ListItemText primary={category.name} />
            </ListItem>
          )
        }
      })
    } else {
      return (
        <div>There are no predefined categories available.</div>
      )
    }
  }

  renderCategoryOptions = () => {
    if(this.state.activeCategory) {
      if(this.state.activeCategory.options && this.state.activeCategory.options.length) {
        let options = this.state.activeCategory.options;
        let labelProp = 'name';
        let valueProp = 'value';
        return options.map((option) => {
          return (
            <ListItem key={option.id}>
              <ListItemText
                primary={option[labelProp]}
              />
              {(!this.state.activeCategory.is_secure) ? (
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={e => this.deleteOption(option)}>
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              ) : ""}
            </ListItem>
          )
        })
      } else if(this.state.activeCategory.is_secure) {
        return (
          <span>
            No options available
          </span>
        )
      } else {
        return (
          <span>
            Start Creating new options
          </span>
        )
      }
    } else {
      return (
        <span>
          Select a category to view its options
        </span>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="ahfb-width-full ahfb-text-right">
          <Button color="primary" onClick={this.handleClickOpen}>{(this.state.activeCategory && this.state.activeCategory.isPublic) ? (<DoneIcon/>) : ""} Add Predefined Values</Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          maxWidth="xl"
        >
          <AppBar className="ahfb-position-relative">
            <Toolbar>
              <Typography variant="h6">
                Add Predefined Values
              </Typography>
              <IconButton className="ahfb-position-absolute ahfb-shift-right" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Grid container className="ahfb-dialog-content-root">
              <Grid item xs={5} className="ahfb-pr-1 ahfb-categories-list-container">
                <div className="ahfb-position-relative">
                  <Typography variant="h6" component="h6" className="ahfb-categories-add-heading">
                    <span>Categories</span>
                    <Tooltip title="Add a new category">
                      <IconButton onClick={this.handleAddCategoryOpen} className="ahfb-categories-add-icon">
                        <AddIcon/>
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </div>
                {this.renderAddCategory()}
                <List className="ahfb-categories-list">
                  {this.renderCategories()}
                </List>
              </Grid>
              <Grid item xs={7}>
                <List>
                  {this.renderCategoryOptions()}
                  {this.renderAddOption()}
                </List>
              </Grid>
            </Grid>
            {!!(this.state.insertError) ? (
              <FormHelperText error>{this.state.insertError}</FormHelperText>
            ) : ""}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={this.handleInsert} variant="contained" color="primary">
              Insert Choices
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.showAddCategoryMsg}
          autoHideDuration={6000}
          onClose={this.handleAddCategoryMsgClose}
          message="New category successfully added."
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleAddCategoryMsgClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  predefined: state.form.predefined,
  predefinedEndpoint: state.form.predefinedEndpoint
})

const mapDispatchToProps = dispatch => ({
  addCategory: (data) => dispatch(addCategory(data)),
  updateCategoryOptions: (data, slug) => dispatch(updateCategoryOptions(data, slug))
})

export default connect(mapStateToProps, mapDispatchToProps)(PredefinedValues);