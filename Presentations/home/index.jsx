import { Container, CssBaseline } from "@material-ui/core";
import { Fragment } from "react";
import { createUseStyles, useTheme } from "react-jss";
import {
  CogOutline,
  UserAddOutline,
  LoginOutline,
  ArrowLeft,
  LibraryOutline,
} from "heroicons-react";
import { Vector, Logo } from "../../Assets/index";
import BottomNavigation from "../../Atoms/bottomNavigation";
import Drawer from "../../Atoms/drawer";
import Login from "./component/login";
import Register from "./component/register";
import Verification from "./component/verification";
import Bank from "./component/bank";
import {
  VERIFICATION_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  WALLET_PAGE,
  BANK_PAGE,
  LOGIN_AND_REGISTER_PAGE,
} from "../../Utils/constant";

const useStyles = createUseStyles({
  container: {},
  vector: {
    backgroundImage: `url(${Vector})`,
    position: "absolute",
    height: 446,
    width: "100%",
    top: -41,
    left: -41,
    backgroundRepeat: "no-repeat",
  },
  appBar: {
    marginTop: 30,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 55,
    height: 55,
    zIndex: 100,
  },
  textHeader: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 300,
    display: "inline",
  },
  ul: {
    listStyle: "none",
    padding: "0 12px",
    marginTop: 0,
  },
  li: {
    display: "flex",
    alignItems: "center",
    height: 51,
    boxSizing: "border-box",
    borderRadius: 6,
    paddingLeft: 9,
    fontWeight: 400,
    paddingRight: 5,
    fontFamily: ({ theme }) => theme.fontText,

    "& span": {
      marginLeft: 15,
      fontSize: 18,
    },
    "&:hover": {
      border: "1px solid rgba(196, 196, 196, 0.18)",
      backgroundColor: ({ theme }) => theme.primaryColor,
      color: "white",
    },
  },
});

const Home = ({
  auth,
  page,
  onAuth,
  onOpen,
  bottomLinks,
  onBankSubmit,
  onLoginSubmit,
  onRegisterSubmit,
  onVerificationSubmit,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  const routeLink = (
    <ul className={classes.ul}>
      <li onClick={() => onAuth(REGISTER_PAGE)} className={classes.li}>
        <UserAddOutline />
        <span>Register</span>
      </li>
      <li onClick={() => onAuth(LOGIN_PAGE)} className={`${classes.li}`}>
        <LoginOutline />
        <span>Login</span>
      </li>
    </ul>
  );
  const walletLink = (
    <ul className={classes.ul}>
      <li onClick={() => onAuth(BANK_PAGE)} className={classes.li}>
        <LibraryOutline />
        <span>Bank</span>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.vector}></div>
      <Container className={classes.container} maxWidth="sm">
        <div className={classes.appBar}>
          <img className={classes.logo} src={Logo} alt=".." />
          <CogOutline size={29} style={{ cursor: "pointer" }} />
        </div>
      </Container>
      <BottomNavigation data={bottomLinks} />
      <Drawer onClos={() => {}} onOpen={onOpen} open={auth}>
        <div style={{ display: "flex", alignItems: "center", paddingLeft: 18 }}>
          {" "}
          {page === LOGIN_PAGE ? (
            <>
              <ArrowLeft onClick={() => onAuth(LOGIN_AND_REGISTER_PAGE)} />
              <p className={classes.textHeader}>Login</p>
            </>
          ) : page === REGISTER_PAGE ? (
            <>
              <ArrowLeft onClick={() => onAuth(LOGIN_AND_REGISTER_PAGE)} />
              <p className={classes.textHeader}>Create Account</p>
            </>
          ) : page === VERIFICATION_PAGE ? (
            <>
              <p className={classes.textHeader}>Verification</p>
            </>
          ) : page === WALLET_PAGE ? (
            <>
              <p className={classes.textHeader}>Wallet</p>
            </>
          ) : page === BANK_PAGE ? (
            <>
              <p className={classes.textHeader}>Add bank account</p>
            </>
          ) : (
            <>
              <p className={classes.textHeader}>Welcome</p>
            </>
          )}
        </div>
        {page === LOGIN_PAGE ? (
          <Login onAuth={onAuth} onSubmit={onLoginSubmit} />
        ) : page === REGISTER_PAGE ? (
          <Register onAuth={onAuth} onSubmit={onRegisterSubmit} />
        ) : page === VERIFICATION_PAGE ? (
          <Verification onSubmit={onVerificationSubmit} />
        ) : page === WALLET_PAGE ? (
          walletLink
        ) : page === BANK_PAGE ? (
          <Bank onSubmit={onBankSubmit} />
        ) : (
          routeLink
        )}
      </Drawer>
    </Fragment>
  );
};

export default Home;
