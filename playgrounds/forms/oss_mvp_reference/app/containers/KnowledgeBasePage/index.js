/*
 *
 * KnowledgeBasePage
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectGlobalJS } from '../App/selectors';
import LoadingSpinner from '../LoadingSpinner';

import page from '../../styles/pages.css';

export class KnowledgeBasePage extends React.Component { // eslint-disable-line
  render() {
    let mainContent;

    if (!typeof this.props.global.primary === 'object' &&
        this.props.global.primary !== 'undefined') {
      mainContent = <LoadingSpinner />;
    } else {
      mainContent = React.Children.map(this.props.children, (child) =>
        React.cloneElement(child, {
          global: this.props.global,
        })
      );
    }

    return (
      <div className={page.page}>
        <Helmet title="QuickServe - Knowledge Base" />
        {mainContent}
      </div>
    );
  }
}

KnowledgeBasePage.propTypes = {
  children: React.PropTypes.object,
  global: React.PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  global: selectGlobalJS(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KnowledgeBasePage);
