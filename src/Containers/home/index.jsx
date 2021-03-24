import { Component } from "react";
import { connect } from "react-redux";
import { ShoppingCartOutline, CreditCardOutline, Menu } from "heroicons-react";

import request from '../../utils/request';
import { VERIFICATION_PAGE} from '../../utils/constant';
import { ADDUSERDETAILS } from '../../store/action-types';

import HomeView from "../../presentations/home";
import pageWizard from "../../HOC/pageWizard";


const convertDataToJSON = value => JSON.stringify(value);

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
    let data = await convertDataToJSON(values);
    const response = await this.props.onRegisterAction(data)

    if( response ) this.props.onPage(VERIFICATION_PAGE)
  };

  handleLoginSubmit = async (values) => {
    let data = await convertDataToJSON(values)
    await this.props.onLoginAction(data)
  };

  componentDidMount() {
    if (this.props.user?.token === undefined) {
      this.setState({ auth: true });
    }
  }

  render() {
    const {
      state: { auth },
      props: { page, onPage },
      handleRegisterSubmit,
      handleLoginSubmit,
    } = this;
    return (
      <HomeView
        onPage={onPage}
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

const wrappedComponent = pageWizard(Home);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
