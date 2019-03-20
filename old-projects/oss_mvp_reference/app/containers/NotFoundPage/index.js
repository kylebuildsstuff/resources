/**
 * NotFoundPage
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';

export default class NotFound extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className={styles.error404}>
        <Helmet title="QuickServe - 404 Error" />
        <h1><FormattedMessage {...messages.header} /></h1>
        <p><FormattedMessage {...messages.desc} /></p>
      </div>
    );
  }
}
