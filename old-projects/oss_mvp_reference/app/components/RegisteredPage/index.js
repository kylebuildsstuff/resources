/**
*
* RegisteredPage
*
*/

import React from 'react';
import PageHeader from '../PageHeader';

function RegisteredPage() {
  return (
    <div>
      <PageHeader subTitle="You have" mainTitle="Successfully Signed Up" />
      <p><strong>Thank you!</strong> Please check your email for further instructions. If the email doesn't appear in your inbox, look in your spam folder or contact us.</p>
    </div>
  );
}

export default RegisteredPage;
