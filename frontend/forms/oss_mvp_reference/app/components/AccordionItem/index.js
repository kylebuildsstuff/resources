/**
*
* AccordionItem
*
*/

import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';

class AccordionItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemToggled: false,
    };

    this.toggleItem = this.toggleItem.bind(this);
  }

  toggleItem() {
    this.setState({
      itemToggled: !this.state.itemToggled,
    });
  }

  htmlAnswer() { // eslint-disable-line
    return {
      __html: this.props.answer,
    };
  }

  render() {
    const classNames = classnames(styles.accordionItem, {
      [styles.itemToggled]: this.state.itemToggled,
    });
    return (
      <div className={classNames}>
        <h3 onClick={this.toggleItem}>{this.props.question}</h3>
        <div dangerouslySetInnerHTML={this.htmlAnswer()} />
      </div>
    );
  }
}

AccordionItem.propTypes = {
  question: React.PropTypes.string,
  answer: React.PropTypes.string,
};

export default AccordionItem;
