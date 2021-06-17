import { Component } from "react";
import PropTypes from "prop-types";

const WizardAuth = (WrappedComponent) => {
  class Wizard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        page: "",
      };
      this.onAuthHandler = this.onAuthHandler.bind(this);
      this.onVerificationRoute = this.onVerificationRoute.bind(this);
      this.onWalletRoute = this.onWalletRoute.bind(this);
    }

    onAuthHandler(value) {
      this.setState({ page: value });
    }5

    onVerificationRoute(value) {
      this.setState({ page: value });
    }

    onWalletRoute(value) {
      this.setState({ page: value })
    }

    render() {
      const {
        state: { page },
        props: {},
        onAuthHandler,
        onVerificationRoute,
        onWalletRoute
      } = this;
      return (
        <WrappedComponent
          page={page}
          onWallet={onWalletRoute}
          onAuth={onAuthHandler}
          onVerification={onVerificationRoute}
          {...this.props}
        />
      );
    }
  }

  Wizard.propTypes = {};

  return Wizard;
};

export default WizardAuth;
