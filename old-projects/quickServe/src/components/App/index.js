import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import VehAdditionForm from '../../forms/VehAddition/container';
import './styles.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match
            exactly
            pattern="/"
            render={() => <VehAdditionForm policyNumber={123456} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
