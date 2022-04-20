import React from 'react';
import Toolbar from '../components/toolbar/App'
import {Paper} from "@material-ui/core";
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';

export default function(props) {
  return (
    <Grid container>
      <Grid item xs={7} md={8}>
        {props.children}
      </Grid>
      <Grid item xs={5} md={4}>
        <Toolbar/>
      </Grid>
    </Grid>
  )
}