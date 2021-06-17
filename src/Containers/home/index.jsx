import { Component } from "react";
import { connect } from "react-redux";
import { ShoppingCartOutline, CreditCardOutline, Menu } from "heroicons-react";

import request from '../../Utils/request';
import { LOGIN_PAGE, REGISTER_PAGE, VERIFICATION_PAGE, WALLET_PAGE } from '../../Utils/constant';
import { ADDUSERDETAILS } from '../../Store/action-types';

import HomeView from "../../Presentations/home";
import wizardAuth from "../../hoc/wizardAuth";


const convertDataToJSON = value => JSON.stringify(value);

class Home extends Component {
  state = {
    data: [
      {
        icon: <ShoppingCartOutline size={25} />,
        name: "Product",
        to: '/products'
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
    auth: true,
  };

  handleRegisterSubmit = async (values) => {
    let data = await convertDataToJSON(values);
    const response = await this.props.onRegisterAction(data)

    if( response ) this.props.onVerificationRoute(VERIFICATION_PAGE)
  };

  handleLoginSubmit = async (values) => {
    let data = await convertDataToJSON(values)
    await this.props.onLoginAction(data)
  };

  componentDidMount() {
    if (this.props.user?.token === undefined) {
      this.setState({ auth: false }); // TODO 
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
          headers: {
            "content-type": "application/json"
          },
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
