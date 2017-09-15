/**
*
* AccountFormSubmitSuccess
*
*/

import React from 'react';

import styles from './styles.css';

class AccountFormSubmitSuccess extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // const { willShowGenericMessage: genMsg } = this.props;
    return (
      <div className={styles.accountVehicleAddSuccess}>
        <p>
          Thank you for using QuickServe! We received your request.
        </p>
        <p>
          Please note, the coverage is not binding until you receive confirmation of the change from SmartCoverage.
        </p>
        <p>
          We may contact you to discuss further details, as necessary.
        </p>
        <p>
          You should receive your new documents within 7 to 10 days after the change has been processed.
        </p>
        {/* {genMsg ? (
          <div>We've successfully received your request. A broker will contact you to confirm the details.</div>
        ) : (
          <div>
            We've successfully received your request.
          </div>
        )} */}
      </div>
    );
  }
}

AccountFormSubmitSuccess.propTypes = {
  willShowGenericMessage: React.PropTypes.any,
};

export default AccountFormSubmitSuccess;
