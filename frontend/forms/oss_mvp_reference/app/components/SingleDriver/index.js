/**
*
* SingleDriver
*
*/

import React from 'react';
import moment from 'moment/moment';
import { marital, licenceClass } from '../../utils/helpers';

function SingleDriver(props) {
  return (
    <div>
      <ul className="list-unstyled">
        <li><strong>Date of birth:</strong> {moment(props.driver.date_of_birth).format('MMMM D, YYYY')}</li>
        <li><strong>Marital status:</strong> {marital(props.driver.marital_status_code)}</li>
        {
          licenceClass(props.driver.licences) !== '' ? (
            <li><strong>Licence class:</strong> {licenceClass(props.driver.licences)}</li>
          ) : (
            ''
          )
        }
      </ul>
    </div>
  );
}

SingleDriver.propTypes = {
  driver: React.PropTypes.object,
};

export default SingleDriver;
