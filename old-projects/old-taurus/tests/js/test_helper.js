import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils'
import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../assets/js/reducers/index';

// set up testing environment to run like a browser in the command line
// global is the node equivalent to the browser's 'window'
global.document.jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

// build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return ReactDOM.findDOMNode(componentInstance); // produces html
}

// build helper for simulating events
// ... uses jquery stuff

export {renderComponent, expect};
