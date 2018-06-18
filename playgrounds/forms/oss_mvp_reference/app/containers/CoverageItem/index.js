/**
*
* CoverageItem
*
*/

import React from 'react';
import classnames from 'classnames';
import schema from '../../utils/coverages';

import styles from './styles.css';

export class CoverageItem extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
    };
  }

  toggleItem = () => {
    this.setState({
      toggled: !this.state.toggled,
    });
  }

  render() {
    const classNames = classnames(styles.coverageItem, {
      clearfix: 'clearfix',
      [styles.hasText]: schema[this.props.item.code].help !== '',
      [styles.toggled]: this.state.toggled,
    });
    let itemValue;

    if (this.props.item.deductible_amount) {
      itemValue = <span>${this.props.item.deductible_amount} <small>deductible</small></span>;
    } else if (this.props.item.limit_amount) {
      itemValue = <span>${this.props.item.limit_amount} <small>limit</small></span>;
    } else {
      itemValue = <span className={styles.check}>✓</span>;
    }
    if (this.props.item.type) {
      return (
        <li className={classNames}>
          <div>
            <strong onClick={this.toggleItem}>{this.props.item.description}</strong>
            {
              schema[this.props.item.code].help && (
                <div>
                  <p>{schema[this.props.item.code].help}</p>
                </div>
              )
            }
          </div>
          {itemValue}
        </li>
      );
    }
    return null;
  }
}

CoverageItem.propTypes = {
  item: React.PropTypes.object,
};

export default CoverageItem;
