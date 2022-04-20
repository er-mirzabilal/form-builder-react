import React, {Component} from 'react'
import {render} from 'react-dom'
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

import Example from '../../src';

// you backend api
const apiURL = 'your_api_url';


export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fields: []
    }
    this.myRef = React.createRef();
  }

  componentDidMount() {
    axios.get(`${apiURL}/form/getMasterFields`)
      .then((res) => {
        this.setState({
          fields: res.data
        })
      }).catch((err) => {
      this.setState({
        fields: []
      })
    })
  }

  render() {
    return (
      <Paper>
        <Example theme={{ direction: 'ltr' }} ref={this.myRef} onSubmit={(data) => {console.log('formData', data)}} predefinedEndpoint={`${apiURL}/predefined`} fileUploadUrl={`${apiURL}/single-file-upload`} conditionableFields={this.state.fields}/>
        <button onClick={e => this.myRef.current.initializeSubmit()}>load</button>
      </Paper>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
