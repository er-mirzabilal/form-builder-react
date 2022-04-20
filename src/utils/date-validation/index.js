import React from 'react'
import Checkbox from "../checkboxs/Checkbox";
import SearchableSelect from "../selects/SearchableSelect";
import TextInput from "../inputs/TextInput";
import { Grid } from '@material-ui/core'

function DateValidation(props) {
  const durationOptions = [{label: 'Days', value: 'days'}, {label: 'Months', value: 'months'}, {label: 'Years', value: 'years'}];
  return (
    <div>
      <Checkbox checked={props.shouldDateValidate} handleChange={val => props.handleChange(val, 'shouldDateValidate')} label="Set Date Validation"/>
      {(props.shouldDateValidate) ? (
        <Grid container >
          <Grid item xs={12} className='mb-2'>
            <Checkbox checked={props.shouldPastDateValidate} handleChange={val => props.handleChange(val, 'shouldPastDateValidate')} label="Set Past Date"/>
          </Grid>
          {(props.shouldPastDateValidate && (
            <Grid container spacing={3} className='mt-4'>
              <Grid item xs={12}>
                <SearchableSelect label="Unit" options={durationOptions} handleChange={e => props.handleChange(e.target.value, 'pastUnit')} value={props.pastUnit}/>
              </Grid>
              <Grid item xs={12} container>
              <Grid item xs={6} className="ahfb-pr-1">
              <TextInput type="number" label="Min" value={props.pastMin} handleChange={e => props.handleChange(e.target.value, 'pastMin')} error={props.errors?.pastLimitValidation?.min}  />
              </Grid>
              <Grid item xs={6} className="ahfb-pl-1">
              <TextInput type="number" label="Max" value={props.pastMax} handleChange={e => props.handleChange(e.target.value, 'pastMax')} error={props.errors?.pastLimitValidation?.max}/>
              </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12} className='mb-2'>
            <Checkbox checked={props.shouldFutureDateValidate} handleChange={val => props.handleChange(val, 'shouldFutureDateValidate')} label="Set Future Date"/>
          </Grid>
          {props.shouldFutureDateValidate && (
            <Grid container spacing={3} className='mt-4'>
              <Grid item xs={12}>
              <SearchableSelect label="Unit" options={durationOptions} handleChange={e => props.handleChange(e.target.value, 'futureUnit')} value={props.futureUnit}/>
            </Grid>
              <Grid item xs={12} container>
                <Grid item xs={6} className="ahfb-pr-1">
                  <TextInput type="number" label="Min" value={props.futureMin} handleChange={e => props.handleChange(e.target.value, 'futureMin')} error={props.errors?.futureLimitValidation?.min}/>
                </Grid>
                <Grid item xs={6} className="ahfb-pl-1">
                  <TextInput type="number" label="Max" value={props.futureMax} handleChange={e => props.handleChange(e.target.value, 'futureMax')} error={props.errors?.futureLimitValidation?.max}/>
                </Grid>
              </Grid>
            </Grid>
          )}

        </Grid>
      ) : ""}
    </div>
  )
}

export default DateValidation;