import { Component } from "react";
import { connect } from "react-redux";
import { ShoppingCartOutline, CreditCardOutline, Menu } from "heroicons-react";

import request from '../../Utils/request';
import { LOGIN_PAGE, REGISTER_PAGE, VERIFICATION_PAGE, WALLET_PAGE } from '../../Utils/constant';
import { ADDUSERDETAILS } from '../../Store/action-types';

import HomeView from "../../Presentations/home";
import wizardAuth from "../../hoc/wizardAuth";

class Home extends Component {
  state = {
    data: [
      {
        icon: <ShoppingCartOutline size={25} />,
        name: "Product",
      },
      {
        icon: <CreditCardOutline size={25} />,
        name: "Credit score",
      },
      {
        icon: <Menu size={25} />,
        name: "Transactions",
      },
    ],
    auth: false,
  };

  handleRegisterSubmit = async (values) => {
    const response = await this.props.onRegisterAction(values)

    if( response ) this.props.onVerificationRoute(VERIFICATION_PAGE)
  };

  handleLoginSubmit = (values) => {
    console.log(values);
  };

  componentDidMount() {
    if (this.props.user?.token === undefined) {
      this.setState({ auth: true });
    }
  }

  render() {
    const {
      state: { auth },
      props: { page, onAuth },
      handleRegisterSubmit,
      handleLoginSubmit,
    } = this;
    return (
      <HomeView
        onAuth={onAuth}
        page={page}
        auth={auth}
        onLoginSubmit={handleLoginSubmit}
        onRegisterSubmit={handleRegisterSubmit}
        bottomLinks={this.state.data}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginAction: async (data) => {
      try {
        const res = await request({
          url: '/user/login',
          method: 'POST',
          data,
        });

        dispatch({ type: ADDUSERDETAILS, payload: res.data })
      } catch (error) {
        console.log(error)
      }
    },

    onRegisterAction: async (data) => {
      try {
        const res = await request({
          url: '/user/register',
          method: 'POST',
          data,
        });
        console.log(res.data)
        dispatch({ type: ADDUSERDETAILS, payload: res.data })
        return res
      } catch (error) {
        
      }
    },

    onVerificationAction: async () => {
      try {
        
      } catch (error) {
        
      }
    }
  };
};

const wrappedComponent = wizardAuth(Home);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
