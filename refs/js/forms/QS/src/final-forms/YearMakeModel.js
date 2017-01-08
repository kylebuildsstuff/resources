import React from 'react';
import { connect } from 'react-redux';
import Text from './Fields/Text';
import Select from './Fields/Select';
import { formSelector } from '../selectors';
import axios from 'axios';

class YearMakeModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      makes: [],
      models: [],
    }
  }

  fetchMakes = (e) => {
    if (e.target.value && e.target.value.length === 4) {
      console.log('fetching makes now...');
      const url = `http://localhost:3001/${e.target.value}/`;
      axios({
        method: 'get',
        url,
      }).then((response) => {
        this.setState({
          makes: response.data
        });
      }).catch((error) => error);
    }
  }

  fetchModels = (e) => {
    const url = `http://localhost:3001/${e.target.value}/`;
    axios({
      method: 'get',
      url,
    }).then((response) => {
      this.setState({
        models: response.data
      });
    }).catch((error) => error);
  }

  render() {
    return (
      <div>
        <Text name="year" label="Vehicle Year" onChange={this.fetchMakes} />
        <Select
          name="make" required label="Vehicle Make"
          options={this.state.makes} onChange={this.fetchModels}
        />
        <Select name="model" required
          label="Vehicle Model" options={this.state.models}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { form: formSelector(state) }
}

export default connect(mapStateToProps)(YearMakeModel);
