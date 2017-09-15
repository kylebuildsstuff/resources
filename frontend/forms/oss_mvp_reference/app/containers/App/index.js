/**
 *
 * App - primary container
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Sidebar from '../Sidebar';
import { createStructuredSelector } from 'reselect';
import { selectGlobalJS, selectUi } from './selectors';
import { toggleMenu } from './actions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ModalDialog from '../../containers/ModalDialog';
import PromoBlock from '../../containers/PromoBlock';
import GlobalMessage from '../../components/GlobalMessage';

import styles from './styles.css';
import '../../styles/new-forms.css';

class App extends React.Component { // eslint-disable-line

  // onLogout = () => {
  //   this.props.activateModal(true, 'logout', 'Are you sure you wish to logout?', 'Click yes to confirm.');
  // }

  toggleMenu = () => {
    this.props.toggleMenu(!this.props.ui.menuActive);
  }

  render() {
    const classNames = classnames(styles.wrapper, {
      [styles.blurred]: this.props.ui.menuActive || this.props.ui.modalActive,
    });
    return (
      <div>
        <PromoBlock path={this.props.location.pathname} />
        <div className="container">
          <div
            className={classNames}
            onClick={this.props.ui.menuActive && this.toggleMenu}
          >
            <div>
              {React.Children.toArray(this.props.children)}
              <Footer />
            </div>
          </div>
        </div>
        <Header
          authed={this.props.global.authed}
          toggleMenu={this.toggleMenu}
          username={
            `${this.props.global.primary.first_name} ${this.props.global.primary.last_name}`
          }
        />
        <Sidebar authed={this.props.global.authed} toggleMenu={this.toggleMenu} />
        <GlobalMessage global={this.props.global} />
        <ModalDialog ui={this.props.ui} />
      </div>
    );
  }
}

App.propTypes = {
  global: React.PropTypes.any,
  location: React.PropTypes.any,
  getData: React.PropTypes.func,
  activateModal: React.PropTypes.func,
  toggleMenu: React.PropTypes.func,
  ui: React.PropTypes.object,
  children: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  global: selectGlobalJS(),
  ui: selectUi(),
});

function mapDispatchToProps(dispatch) {
  return {
    // activateModal: (bool, path, title, body) => dispatch(activateModal(bool, path, title, body)),
    toggleMenu: (active) => dispatch(toggleMenu(active)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
