/**
*
* ChangeAddress
*
*/

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import PageHeader from '../../components/PageHeader';

import page from '../../styles/pages.css';
import styles from './styles.css';

import moving from '../../assets/moving.svg';
import buying from '../../assets/add-a-vehicle.svg';
import replacing from '../../assets/replacing-a-vehicle.svg';
import adding from '../../assets/add-a-driver.svg';
import changing from '../../assets/changing-coverage.svg';
import documents from '../../assets/looking-for-document.svg';
import cancel from '../../assets/cancelling-policy.svg';
import selling from '../../assets/remove-a-vehicle.svg';

function KbHome(props) {
  return (
    <div className={page.page}>
      <Helmet title="QuickServe - Knowledge Base" />
      <PageHeader subTitle="Browse around the" mainTitle="Knowledge Base" />
      <section className={page.linkBlock}>
        <div>
          <h3>Select a change to make to your policy</h3>
          {
            props.global.authed ? (
              <div className={styles.questions}>
                <Link to="/account/change-your-address"><img src={moving} alt="Are you moving?" /><br /><span>Are you moving?</span></Link>
                <Link to="/account/vehicles/add-vehicle"><img src={buying} alt="Are you buying a car?" /><br /><span>Are you buying a car?</span></Link>
                <Link to="/account/vehicles/replace"><img src={replacing} alt="Are you trading in a car?" /><br /><span>Are you trading in a car?</span></Link>
                <Link to="/kb/adding-a-driver"><img src={adding} alt="Are you adding a driver?" /><br /><span>Are you adding a driver?</span></Link>
                <Link to="/kb/changing-your-coverage"><img src={changing} alt="Are you changing your coverage?" /><br /><span>Changing your coverage?</span></Link>
                <Link to="/kb/need-documents"><img src={documents} alt="Do you need documents?" /><br /><span>Do you need documents?</span></Link>
                <Link to="/kb/cancel-your-policy"><img src={cancel} alt="Are you cancelling your policy?" /><br /><span>Cancelling your policy?</span></Link>
                <Link to="/kb/selling-a-car"><img src={selling} alt="Are you selling a car?" /><br /><span>Are you selling a car?</span></Link>
              </div>
            ) : (
              <div className={styles.questions}>
                <Link to="/kb/are-you-moving"><img src={moving} alt="Are you moving?" /><br /><span>Are you moving?</span></Link>
                <Link to="/kb/buying-a-car"><img src={buying} alt="Are you buying a car?" /><br /><span>Are you buying a car?</span></Link>
                <Link to="/kb/trading-in-a-car"><img src={replacing} alt="Are you trading in a car?" /><br /><span>Are you trading in a car?</span></Link>
                <Link to="/kb/adding-a-driver"><img src={adding} alt="Are you adding a driver?" /><br /><span>Are you adding a driver?</span></Link>
                <Link to="/kb/changing-your-coverage"><img src={changing} alt="Are you changing your coverage?" /><br /><span>Changing your coverage?</span></Link>
                <Link to="/kb/need-documents"><img src={documents} alt="Do you need documents?" /><br /><span>Do you need documents?</span></Link>
                <Link to="/kb/cancel-your-policy"><img src={cancel} alt="Are you cancelling your policy?" /><br /><span>Cancelling your policy?</span></Link>
                <Link to="/kb/selling-a-car"><img src={selling} alt="Are you selling a car?" /><br /><span>Are you selling a car?</span></Link>
              </div>
            )
          }
        </div>
      </section>
    </div>
  );
}

KbHome.propTypes = {
  global: React.PropTypes.object,
};

export default KbHome;
