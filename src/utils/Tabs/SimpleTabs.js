import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import { setAddLanguageSelect } from '../../actions/formActions'

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component  {
  componentDidMount() {
    this.props.setAddLanguageSelect({target: {value: ''}});
  }


  render() {
    const {value, handleChange, options, classes, locals, addLanguageSelect} = this.props;

    return (
      <div className={classes.root}>
        <Paper square>
          <Tabs
            variant="fullWidth"
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
          >
            {options.map((option) => (
              <Tab key={"tab-" + option.value} value={option.value} label={option.label}/>
            ))}
          </Tabs>

        </Paper>

        {(locals && locals.length !== 0) && (
          <div className="ahfb-width-ful ahfb-px-3 ahfb-mt-3">
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <label className="ahfb-mt-3 ahfb-align-center">Add Language</label>
              </Grid>
              <Grid item xs={12} md={9}>
                <FormControl className="ahfb-width-ful ahfb-d-flex">
                  <InputLabel id="demo-simple-select-label">Select language</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addLanguageSelect}
                    onClick={this.props.setAddLanguageSelect}
                  >
                    {locals.map(locale => (
                      <MenuItem key={locale.key} value={locale.key}>{locale.name}</MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        )}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  locals: state.form.locals,
  addLanguageSelect: state.form.addLanguageSelect
})

const mapDispatchToProps = dispatch => ({
  setAddLanguageSelect: (e) => dispatch(setAddLanguageSelect(e.target.value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SimpleTabs));