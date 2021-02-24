import {
  Container,
  CssBaseline,
} from "@material-ui/core";
import { Fragment } from "react";
import { createUseStyles } from "react-jss";
import { CogOutline, UserAddOutline, LoginOutline } from "heroicons-react";
import { Vector, Logo } from "../../Assets/index";
import BottomNavigation from "../../Atoms/bottomNavigation";
import Drawer from "../../Atoms/drawer";
import Button from "../../Atoms/button";

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
    marginLeft: 10
  },
  ul: {
    listStyle: 'none',
    padding: '0 12px',
    marginTop: 0
  },
  li: {
    display: 'flex',
    alignItems: 'center',
    height: 51,
    boxSizing: 'border-box',
    borderRadius: 6,
    paddingLeft: 9,
    fontWeight: 300,
    paddingRight: 5,
    fontFamily: "'Roboto', sans-serif",

    '& span': {
      marginLeft: 15,
      fontSize: 18
    }
  },
  activeList: {
    border: '1px solid rgba(196, 196, 196, 0.18)',
    backgroundColor: '#588ac5',
    color: 'white'
  }
});

const Home = ({ bottomLinks }) => {
  const classes = useStyles();
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
      <Drawer open={true}>
        <p className={classes.textHeader}>Welcome</p>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <UserAddOutline />
            <span>Register</span>
          </li>
          <li className={`${classes.li} ${classes.activeList}`}>
            <LoginOutline />
            <span>Login</span>
          </li>
        </ul>
      </Drawer>
    </Fragment>
  );
};

export default Home;
