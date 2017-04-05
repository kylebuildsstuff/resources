import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import axios from 'axios';

import VehAddition from './component';

export class VehAdditionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    axios.get('http://localhost:3001/policies')
      .then((res) => {
        this.setState({
          policies: res.data,
        })
      });
  }

  render() {
    return (
      <div>
        <VehAddition
          {...this.props}
          {...this.state}
        />
      </div>
    );
  }
}

let VehAdditionForm = reduxForm({
  form: 'VehAddition',
})(VehAdditionContainer);

function mapStateToProps(state) {
  return ({
    getFormValues: getFormValues('VehAddition')(state),
  });
}

// const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(VehAdditionForm);
