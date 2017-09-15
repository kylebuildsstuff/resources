/*
 *
 * MaintenancePage
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import PageHeader from '../../components/PageHeader';

export class MaintenancePage extends React.Component { // eslint-disable-line
  render() {
    return (
      <div>
        <Helmet title="QuickServe - Site Maintenance" />
        <PageHeader subTitle="We are performing" mainTitle="Site Maintenance" />
        <p>Please check back shortly.</p>
        <Link to="/" className="btn-small">Go Home</Link>
      </div>
    );
  }
}

export default MaintenancePage;
