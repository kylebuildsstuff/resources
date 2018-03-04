import React from 'react';

export const withResponsiveness = (Component) => {
  class Responsiveness extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        screenIsBig: false,
      };
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
      // App essentially only has 2 display modes for content - big or not big.
      // Display notBig for everything that cannot fit 3 panes properly.
      // NOTE: May need to experiment between 800 - 1000 depending on how well 3 panes fits on standard table.
      if (window.innerWidth >= 800) {
        this.setState({ screenIsBig: true });
      } else {
        this.setState({ screenIsBig: false });
      }
    }

    render() {
      return <Component {...this.props} {...this.state} />
    }
  }
}

export default withResponsiveness;
