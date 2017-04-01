import React from 'react';

export function withBase(WrappedComponent) {
  return class extends React.Component {
    renderLabel = () => {
      return (
        <label>
          {this.props.label}
        </label>
      );
    }

    renderElem = () => {
      return (
        <input
          {...this.props.input}
        />
      );
    }

    render() {
      return (
        <WrappedComponent
          renderElem={this.renderElem}
          renderLabel={this.renderLabel}
          {...this.props}
        />
      );
    }
  }
}

export default withBase;
