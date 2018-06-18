/*
 *
 * SystemErrorPage
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import PageHeader from '../../components/PageHeader';

export class SystemErrorPage extends React.Component { // eslint-disable-line
  render() {
    return (
      <div>
        <Helmet title="QuickServe - 500 Error" />
        <PageHeader subTitle="The site encountered a" mainTitle="System Error" />
        <p>Please check back shortly.</p>
        <Link to="/" className="btn-small">Go Home</Link>
      </div>
    );
  }
}

export default SystemErrorPage;
