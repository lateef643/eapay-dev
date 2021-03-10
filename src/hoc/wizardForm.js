import { Component } from "react";
import PropTypes from 'prop-types'

const WizardForm = (WrappedComponent ) => {
  class WizardForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        page: 1
      }
      this.nextPage = this.nextPage.bind(this);
      this.previousPage = this.previousPage.bind(this);
    }

    nextPage() {
      this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
      this.setState({ page: this.state.page - 1 })
    }

    render() {
      const { state: { page }, props: { onSubmit }, nextPage, previousPage } = this;
      return (
        <WrappedComponent page={page} next={nextPage} previous={previousPage} submit={onSubmit} {...this.props} />
      )
    }
  }

  WizardForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  return WizardForm;
}

export default WizardForm;