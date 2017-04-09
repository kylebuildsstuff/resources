import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Home from '../Home';
import Modal from '../Modal';
import Gallery from '../Gallery';
import ImageView from '../ImageView';

export class ModalSwitch extends React.Component {
  // previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    )
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/' component={Home} />
          <Route path='/gallery' component={Gallery} />
          <Route path='/img/:id' component={ImageView} />
        </Switch>
        {isModal ? <Route path='/img/:id' component={Modal} /> : null}
      </div>
    );
  }
}

export default ModalSwitch;
