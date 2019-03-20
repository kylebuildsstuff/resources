/*
 *
 * RegisterPage
 *
 */

 import React from 'react';
 import { connect } from 'react-redux';
 import Helmet from 'react-helmet';
 import selectRegisterPage from './selectors';
 import Register from '../../forms/Register';
 import { register } from './actions';
 import PageHeader from '../../components/PageHeader';
 import FeatureBlock from '../../components/FeatureBlock';
 import { forwardTo } from '../../utils/helpers';

 export class RegisterPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
   componentDidMount() {
     if (this.props.health === false) {
       forwardTo('/maintenance', 0);
     }
   }
   register = (values) => { // eslint-disable-line
     return new Promise((resolve, reject) => {
       this.props.register(values, resolve, reject);
     });
   }

   render() {
     return (
       <div>
         <Helmet title="QuickServe - Sign Up" />
         <PageHeader subTitle="QuickServe" mainTitle="Sign Up Now" />
         <p>Signing up for <strong>QuickServe</strong> is simple. To get started, fill out the information below. Then you can access your policy online, anytime.</p>
         <Register onSubmit={this.register} />
         <FeatureBlock />
       </div>
     );
   }
 }

 RegisterPage.propTypes = {
   register: React.PropTypes.func,
   health: React.PropTypes.bool,
 };

 const mapStateToProps = selectRegisterPage();

 function mapDispatchToProps(dispatch) {
   return {
     register: (values, resolve, reject) => dispatch(register(values, resolve, reject)),
     dispatch,
   };
 }

 export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
