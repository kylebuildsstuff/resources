/**
*
* ChangeAddress
*
*/

import React from 'react';
import Helmet from 'react-helmet';
import AccordionItem from '../../components/AccordionItem';
import KbPromo from '../../components/KbPromo';

import styles from './styles.css';

import documents from '../../assets/looking-for-document.svg';

function NeedDocuments(props) {
  return (
    <div className={styles.kbPage}>
      <Helmet title="QuickServe - Need Documents?" />
      <div className={styles.pageHeader}>
        <h2><img src={documents} alt="Do You Need Documents?" />Do You Need Documents?</h2>
      </div>
      <ul className={styles.accordions}>
        <li>
          <AccordionItem
            question="Lost or Misplaced Pink Slip?" answer="<p>No problem. We'll send replacement cards right away.</p>"
          />
        </li>
        <li>
          <AccordionItem
            question="Need an insurance binder?" answer="<p>Just let us know where to send it.</p>"
          />
        </li>
        <li>
          <AccordionItem
            question="Need a copy of your latest billing schedule?" answer="<p>That's easy. We'll email it.</p>"
          />
        </li>
      </ul>
      {!props.global.authed && <KbPromo />}
    </div>
  );
}

NeedDocuments.propTypes = {
  global: React.PropTypes.object,
};

export default NeedDocuments;
