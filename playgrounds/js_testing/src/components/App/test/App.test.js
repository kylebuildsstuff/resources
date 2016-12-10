import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../App.js';

describe('<App />', () => {
  it('renders properly', () => {
    const component = shallow(<App />);
    expect(toJson(component)).toMatchSnapshot();
  })
});
