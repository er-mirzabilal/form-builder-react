import React from 'react'
import { FormControl, InputLabel } from '@material-ui/core'
import Icon from '../../toolbar/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  labelRoot: {
    transform: 'none'
  },
  signatureIcon: {
    marginTop:'2rem',
    display: 'flex',
    justifyContent: 'center'
  }

}));

export default function SignatureWrapper(props) {
  const classes = useStyles();
  const {isRequired} = props.data.config;
  return (
    <>
    <FormControl required={isRequired} fullWidth={true}>
        <InputLabel shrink={true} classes={{shrink: classes.labelRoot}}> {props.data.name}</InputLabel>
    </FormControl>
    <div className={classes.signatureIcon}>
      <Icon name="signature" height='50px' width='50px'/>
    </div>
    </>
  )

}
