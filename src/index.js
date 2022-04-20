import React from 'react';
import App from './components/app/App';
import { connect, Provider } from 'react-redux'
import {createMuiTheme} from '@material-ui/core/styles';
import {blue} from '@material-ui/core/colors';
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'
import CircularProgress from '@material-ui/core/CircularProgress'
import './styles/index.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700]
    }
  },
});

class FormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.state.loading;
  }

  initializeSubmit = () => {
    this.child.current.submitForm();
  }

  render() {
    if(this.state.loading) {
      return (
        <div className="ahfb-width-full ahfb-text-center ahfb-pt-5 ahfb-pb-5">
          <CircularProgress />
        </div>
      )
    }
    return (
      <Provider store={createStore(
        rootReducer,
        applyMiddleware(thunk)
      )}>
        <div className="ahfb-width-full">
          <App
            locals={this.props.locals}
            theme={this.props.theme}
            initializeSubmit={click => this.initializeSubmit = click}
            onSubmit={this.props.onSubmit}
            formData={this.props.data}
            predefinedEndpoint={this.props.predefinedEndpoint}
            fileUploadUrl={this.props.fileUploadUrl}
            conditionableFields={this.props.conditionableFields}
          />
        </div>
      </Provider>
    )
  }
}

FormBuilder.defaultProps = {
  // data: {
  //   "57f4225f-80dc-4b04-9e5d-c9db1a4130b6": {
  //     "name": "Name",
  //     "machineName": "text-1630396549",
  //     "order": 1,
  //     "uuid": "57f4225f-80dc-4b04-9e5d-c9db1a4130b6",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": []
  //       },
  //       "isConditionalEnabled": false,
  //       "isRequired": true,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   },
  //   "07e087d1-dacf-40cb-8a97-790814bb6c8b": {
  //     "name": "Type",
  //     "machineName": "checkbox-1630396573",
  //     "order": 2,
  //     "uuid": "07e087d1-dacf-40cb-8a97-790814bb6c8b",
  //     "type": "checkbox",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": []
  //       },
  //       "isConditionalEnabled": false,
  //       "isRequired": true,
  //       "helpText": null,
  //       "subType": "checkbox",
  //       "visibility": true,
  //       "optionReferenceId": 22,
  //       "enableOther": false
  //     },
  //     "locals": []
  //   },
  //   "de371b06-75e1-4c2d-8ff6-dca31aa874af": {
  //     "name": "Type 2",
  //     "machineName": "checkbox-1630396813",
  //     "order": 3,
  //     "uuid": "de371b06-75e1-4c2d-8ff6-dca31aa874af",
  //     "type": "checkbox",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": []
  //       },
  //       "isConditionalEnabled": false,
  //       "isRequired": true,
  //       "helpText": null,
  //       "subType": "checkbox",
  //       "visibility": true,
  //       "optionReferenceId": 23,
  //       "enableOther": false
  //     },
  //     "locals": []
  //   },
  //   "223284e5-c062-4643-9efb-e2afaf25d486": {
  //     "name": "radio",
  //     "machineName": "radio-1630926814",
  //     "order": 4,
  //     "uuid": "223284e5-c062-4643-9efb-e2afaf25d486",
  //     "type": "radio",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": []
  //       },
  //       "isConditionalEnabled": false,
  //       "isRequired": false,
  //       "helpText": null,
  //       "subType": "radio",
  //       "visibility": true,
  //       "optionReferenceId": 16,
  //       "enableOther": false
  //     },
  //     "locals": []
  //   },
  //   "c27fcecb-c300-481e-89e3-8c0698c72ed8": {
  //     "name": "Trial",
  //     "machineName": "text-1630396618",
  //     "order": 5,
  //     "uuid": "c27fcecb-c300-481e-89e3-8c0698c72ed8",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "hide",
  //         "logic": "all",
  //         "conditions": [
  //           {
  //             "field": "checkbox-1630396573",
  //             "operator": "includes",
  //             "value": [
  //               83
  //             ]
  //           },
  //           {
  //             "field": "checkbox-1630396813",
  //             "operator": "includes",
  //             "value": [
  //               84
  //             ]
  //           }
  //         ]
  //       },
  //       "isConditionalEnabled": true,
  //       "isRequired": false,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   },
  //   "59f0d414-76d9-4d87-945a-43701f14d04b": {
  //     "name": "dropdown",
  //     "machineName": "select-1630926766",
  //     "uuid": "59f0d414-76d9-4d87-945a-43701f14d04b",
  //     "type": "select",
  //     "order": 6,
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": []
  //       },
  //       "isConditionalEnabled": false,
  //       "isRequired": false,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "select",
  //       "visibility": true,
  //       "isMultiple": false,
  //       "optionReferenceId": 28,
  //       "enableOther": false
  //     },
  //     "locals": []
  //   },
  //   "5629304f-ee95-4fa9-8749-9551b6117657": {
  //     "name": "name - condition - text contains 'amna'",
  //     "machineName": "text-1630926858",
  //     "order": 10,
  //     "uuid": "5629304f-ee95-4fa9-8749-9551b6117657",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": [
  //           {
  //             "field": "text-1630396549",
  //             "operator": "contain",
  //             "value": "amna"
  //           }
  //         ]
  //       },
  //       "isConditionalEnabled": true,
  //       "isRequired": false,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   },
  //   "39a6bacb-23cc-4b27-ad8c-1133b33f757c": {
  //     "name": "name - condition - text starts with 'am'",
  //     "machineName": "text-1630926929",
  //     "order": 11,
  //     "uuid": "39a6bacb-23cc-4b27-ad8c-1133b33f757c",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": [
  //           {
  //             "field": "text-1630396549",
  //             "operator": "prefix",
  //             "value": "am"
  //           }
  //         ]
  //       },
  //       "isConditionalEnabled": true,
  //       "isRequired": false,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   },
  //   "1345641e-210d-45b8-8b49-224e420c289f": {
  //     "name": "name - condition - text ends 'na'",
  //     "machineName": "text-1630926964",
  //     "order": 12,
  //     "uuid": "1345641e-210d-45b8-8b49-224e420c289f",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": [
  //           {
  //             "field": "text-1630396549",
  //             "operator": "postfix",
  //             "value": "na"
  //           }
  //         ]
  //       },
  //       "isConditionalEnabled": true,
  //       "isRequired": false,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   },
  //   "b3315a21-4331-414b-ab47-4dfc699c793a": {
  //     "name": "name -  checkbox inlcudes one",
  //     "machineName": "text-1630926992",
  //     "order": 13,
  //     "uuid": "b3315a21-4331-414b-ab47-4dfc699c793a",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": [
  //           {
  //             "field": "checkbox-1630396573",
  //             "operator": "includes",
  //             "value": [
  //               82
  //             ]
  //           }
  //         ]
  //       },
  //       "isConditionalEnabled": true,
  //       "isRequired": false,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   },
  //   "fd02f158-8b1c-4e12-8f7e-2fe884031694": {
  //     "name": "name -  checkbox excludes one",
  //     "machineName": "text-1630927047",
  //     "order": 14,
  //     "uuid": "fd02f158-8b1c-4e12-8f7e-2fe884031694",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": [
  //           {
  //             "field": "checkbox-1630396573",
  //             "operator": "excludes",
  //             "value": [
  //               82
  //             ]
  //           }
  //         ]
  //       },
  //       "isConditionalEnabled": true,
  //       "isRequired": false,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   },
  //   "aa76865c-0454-4626-9cf6-a932e1fff8e6": {
  //     "name": "name - radio button is male",
  //     "machineName": "text-1630927060",
  //     "order": 15,
  //     "uuid": "aa76865c-0454-4626-9cf6-a932e1fff8e6",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": [
  //           {
  //             "field": "radio-1630926814",
  //             "operator": "is",
  //             "value": 62
  //           }
  //         ]
  //       },
  //       "isConditionalEnabled": true,
  //       "isRequired": false,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   },
  //   "3f5f8e1a-dda6-4f79-b52c-516944bf332d": {
  //     "name": "name - radio button isnot male",
  //     "machineName": "text-1630927239",
  //     "order": 16,
  //     "uuid": "3f5f8e1a-dda6-4f79-b52c-516944bf332d",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": [
  //           {
  //             "field": "radio-1630926814",
  //             "operator": "not",
  //             "value": 62
  //           }
  //         ]
  //       },
  //       "isConditionalEnabled": true,
  //       "isRequired": false,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   },
  //   "b4f8e388-59d7-4362-9fc0-c9a21fd2d834": {
  //     "name": "name - dropdown is 1",
  //     "machineName": "text-1630927256",
  //     "order": 18,
  //     "uuid": "b4f8e388-59d7-4362-9fc0-c9a21fd2d834",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": [
  //           {
  //             "field": "select-1630926766",
  //             "operator": "is",
  //             "value": 98
  //           }
  //         ]
  //       },
  //       "isConditionalEnabled": true,
  //       "isRequired": false,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   },
  //   "0e2cdea6-c67e-4f3d-8d39-760eb608b353": {
  //     "name": "name - dropdown isnot 1",
  //     "machineName": "text-1630927317",
  //     "order": 17,
  //     "uuid": "0e2cdea6-c67e-4f3d-8d39-760eb608b353",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "show",
  //         "logic": "all",
  //         "conditions": [
  //           {
  //             "field": "select-1630926766",
  //             "operator": "not",
  //             "value": 98
  //           }
  //         ]
  //       },
  //       "isConditionalEnabled": true,
  //       "isRequired": false,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   },
  //   "13ec644c-5e62-439a-a550-99a6c0b3893b": {
  //     "name": "name - condition hide - text contains 'amna'",
  //     "machineName": "text-1630927392",
  //     "order": 9,
  //     "uuid": "13ec644c-5e62-439a-a550-99a6c0b3893b",
  //     "type": "text",
  //     "parentId": 0,
  //     "config": {
  //       "conditionalLogic": {
  //         "display": "hide",
  //         "logic": "all",
  //         "conditions": [
  //           {
  //             "field": "text-1630396549",
  //             "operator": "contain",
  //             "value": "amna"
  //           }
  //         ]
  //       },
  //       "isConditionalEnabled": true,
  //       "isRequired": false,
  //       "isRichText": false,
  //       "maxLength": null,
  //       "placeholder": null,
  //       "helpText": null,
  //       "subType": "text",
  //       "regex": null,
  //       "visibility": true
  //     },
  //     "locals": []
  //   }
  // },
  data: {},
  theme: {
    direction: 'ltr'
  },
  locals:
    [
      {key: 'ar', name: 'Arabic'},
      {key: 'ru', name: 'Russian'},
    ]
};

export default FormBuilder;