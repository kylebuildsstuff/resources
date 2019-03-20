/**
*
* CoverageBlock
*
*/

import React from 'react';
import CoverageItem from '../../containers/CoverageItem';

import styles from './styles.css';

function CoverageBlock(props) {
  const coverages = props.coverages.filter((cov) =>
    cov.type === 'coverage'
  );
  const endorsements = props.coverages.filter((cov) =>
    cov.type === 'endorsement'
  );
  return (
    <div className={styles.coverageBlock}>
      <ul className="list-unstyled">
        <li><h4>Coverages</h4></li>
        {coverages.map((item) => <CoverageItem key={item.id} item={item} />)}
      </ul>
      <ul className="list-unstyled">
        {endorsements.map((item) => <CoverageItem key={item.id} item={item} />)}
      </ul>
    </div>
  );
}

CoverageBlock.propTypes = {
  coverages: React.PropTypes.array,
};

export default CoverageBlock;
