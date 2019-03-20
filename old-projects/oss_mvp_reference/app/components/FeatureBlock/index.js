/**
*
* FeatureBlock
*
*/

import React from 'react';
import FontAwesome from 'react-fontawesome';

import styles from './styles.css';

function FeatureBlock() {
  return (
    <div className={styles.featureBlock}>
      <h2>
        Register today and here’s what you can do:
      </h2>
      <div className={styles.feature}>
        <div className={styles.icon}><FontAwesome name="pencil-square-o" /></div>
        <h3>Change Address</h3>
        <p>Are you moving? Headed to college or university? Tell us about it.</p>
      </div>
      <div className={styles.feature}>
        <div className={styles.icon}><FontAwesome name="car" /></div>
        <h3>Change/Add Vehicle</h3>
        <p>Bought a new car? Trading one in? Tell us about your new wheels.</p>
      </div>
      <div className={styles.feature}>
        <div className={styles.icon}><FontAwesome name="comments" /></div>
        <h3>Web Chat</h3>
        <p>Want to talk? We’ve got people who can answer your questions.</p>
      </div>
      <div className={styles.feature}>
        <div className={styles.icon}><FontAwesome name="sticky-note-o" /></div>
        <h3>Liability Slips</h3>
        <p>Some call it a pink slip. You can print them here.</p>
      </div>
    </div>
  );
}

export default FeatureBlock;
