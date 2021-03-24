import { Component } from "react";
import PropTypes from "prop-types";

const PageWizard = (WrappedComponent) => {
  class Wizard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        page: "",
      };
      this.onPageChangeHandler = this.onPageChangeHandler.bind(this);
    }

    onPageChangeHandler(value) {
      this.setState({ page: value });
    }

    render() {
      const {
        state: { page },
        // props: {},
        onPageChangeHandler,
      } = this;
      return (
        <WrappedComponent
          page={page}
          onPage={onPageChangeHandler}
          {...this.props}
        />
      );
    }
  }

  Wizard.propTypes = {};

  return Wizard;
};

export default PageWizard;
