/*
 *
 * ResetPasswordPage
 *
 */

 import React from 'react';
 import { connect } from 'react-redux';
 import ResetPassword from '../../forms/ResetPassword';
 import { resetPassword } from './actions';
 import PageHeader from '../../components/PageHeader';
 import { forwardTo } from '../../utils/helpers';

 export class ResetPasswordPage extends React.Component { // eslint-disable-line
   componentDidMount() {
     if (this.props.health === false) {
       forwardTo('/maintenance', 0);
     }
   }

   onSubmit = (values) => { // eslint-disable-line
     return new Promise((resolve, reject) => {
       this.props.resetPassword(values, resolve, reject);
     });
   }

   render() {
     return (
       <div>
         <PageHeader subTitle="Use this page to" mainTitle="Reset Your Password" />
         <p>If you can't remember your password, we can fix that. Just tell us the email address you used to sign up for SmartCoverage QuickServe, and we’ll email you a link to reset your password.</p>
         <ResetPassword onSubmit={this.onSubmit} />
       </div>
     );
   }
 }

 ResetPasswordPage.propTypes = {
   resetPassword: React.PropTypes.func,
   health: React.PropTypes.func,
 };

 function mapDispatchToProps(dispatch) {
   return {
     resetPassword: (values, resolve, reject) => dispatch(resetPassword(values, resolve, reject)),
     dispatch,
   };
 }

 export default connect(null, mapDispatchToProps)(ResetPasswordPage);
