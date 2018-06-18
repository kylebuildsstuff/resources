/**
*
* PasswordResetEmailSentPage
*
*/

import React from 'react';
import PageHeader from '../PageHeader';

function PasswordResetEmailSentPage() {
  return (
    <div>
      <PageHeader subTitle="We have" mainTitle="Reset Your Password" />
      <p>Your password reset instructions are on their way. Please check your email for further instructions. If the email doesn't appear in your inbox, look in your spam folder or contact us.</p>
    </div>
  );
}

export default PasswordResetEmailSentPage;
