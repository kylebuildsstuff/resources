import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Home from '../Home';
import Modal from '../Modal';
import Gallery from '../Gallery';
import ImageView from '../ImageView';

// We can pass a location to <Switch/> that will tell it to
// ignore the router's current location and use the location
// prop instead.
//
// We can also use "location state" to tell the app the user
// wants to go to `/images/2` in a modal, rather than as the
// main page, keeping the gallery visible behind it.
//
// Normally, `/images/2` wouldn't match the gallery at `/`.
// So, to get both screens to render, we can save the old
// location and pass it to Switch, so it will think the location
// is still `/` even though its `/images/2`.

export class ModalSwitch extends React.Component {
  previousLocation = this.props.location; // ES8 or ES9 stuff... object properties, the same as defining methods on classes like method = () => {...}

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location; // not initial render
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!( // Short for isTrue... returns true or false
      // It converts a nonboolean to an inverted boolean (for instance, !5 would be false, since 5 is a non-false value in JS), then boolean-inverts that so you get the original value as a boolean (so !!5 would be true)
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
