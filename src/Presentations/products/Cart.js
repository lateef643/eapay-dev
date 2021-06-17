import {component} from "react";
import { createUseStyles, useTheme } from "react-jss";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';
// import {makeStyles} from '@material-ui/styles';
import Typography from "@material-ui/core/Typography";
import louivitton from "../../Assets/louivitton.png";
import { Link } from "react-router-dom";
import Header from "../../Atoms/header";
import { ArrowLeft } from "heroicons-react";
import ProceedButton from "../../Atoms/button";
import {DispatchIcon} from '../../Assets/index';
import {maxIcon} from '../../Assets/index';
import {customerpic} from '../../Assets/index';
// import { Link } from "react-router-dom";
// import { useTheme } from "react-js";
import Drawer from "../../Atoms/drawer";
import Input from '../../Atoms/Input';
import { reduxForm, Field } from "redux-form";
import {
  CogOutline,
  UserAddOutline,
  LoginOutline,
  LibraryOutline,
} from "heroicons-react";
import {useState} from 'react';
import {Vector, Logo} from "../../Assets/index"
import BottomNavigation from "../../Atoms/bottomNavigation";
import Register from "../home/component/login";
import Verification from "../home/component/verification";
import Bank from "../home/component/bank";
import HOC  from "../../hoc/wizardAuth";
import Login from "../home/component/login"
import {
  VERIFICATION_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  WALLET_PAGE,
  BANK_PAGE,
  LOGIN_AND_REGISTER_PAGE,
  DISPATCHER_PAGE,
  PAYMENTLINK_PAGE
} from "../../Utils/constant";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
  two: {
    color: "white",
  },
  img:{
    margin:"10px"
  },
  root1: {
    // boxShadow: "0px 1px 13px rgba(0, 0, 0, 0.32)",
    margin:"10px 10px 10px 10px",
    textAlign:"center",
    marginBottom:"10px",
    borderRadius:"10px"
  },
  media: {
    height: 200,
  },
  root: {
    boxShadow: "0px 1px 13px rgba(0, 0, 0, 0.32)",
    borderRadius: "7px",
    margin: "18px 18px",
  },
  button1: {
    position: "absolute",
    bottom: "9px",
    width: "100%",
    textAlign: "center",
  },
  textHeader: {
    fontWeight: "initial",
    marginRight: "110px"
 
  },
  typo: {
    marginLeft: "10px"
  },
  text1:{
    marginRight: "10px"
  },
  
  text: {
    color: "green"
  },
  ul: {
    listStyle: "none",
    padding: "0 12px",
    marginTop: 0,
  },
  
  newdiv: {
    display: "flex",
    alignItems: "center"
  },
  button: {
    position:"absolute",
    bottom: "9px",
    width: '100%',
    textAlign: 'center',
 
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




 
function MediaCards({
  auth,
  page,
  onAuth,
  onOpen,
  ...props
}) {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  const [isDrawer, setDrawer ] = useState(false);
  const routeLink = (
    <ul className={classes.ul}>

      <li onClick={() => onAuth(DISPATCHER_PAGE)}  className={classes.li}>
        <span><Typography> 24, Sowore iluPeju Lagos</Typography></span>
      </li>
      <li onClick={() => onAuth(DISPATCHER_PAGE)}  className={`${classes.li}`}>
        <span><Typography> 24, Akinsanmi iluPeju Lagos</Typography></span>
      </li>
 
    </ul>
  );

  const PaymentLink = (
    <>
      <div className={classes.newdiv}>
        <img className={classes.img} src={customerpic}/>
        <div ><Typography>Will Marks Shop</Typography></div>
      </div>
    <div >
      <form  noValidate autoComplete="off">
        <TextField  className={classes.root1} fullWidth id="outlined-basic" label="NGN" variant="outlined" />
        <TextField  className={classes.root1} fullWidth id="outlined-basic" label="NGN" variant="outlined" />
        <TextField  className={classes.root1} fullWidth id="outlined-basic" label="NGN" variant="outlined" />
      </form>
    </div>
    <Button size="small" color="black">
            NGN 100
    </Button>
          
    </>
   
    

    //   <ul className={classes.ul}>

    //   <li  className={classes.li}>
    //     <span><Typography> </Typography></span>
    //   </li>
    //   <li  className={`${classes.li}`}>
    //     <span><Typography></Typography></span>
    //   </li>
 
    // </ul>
  );

  const DispatcherLink = (
    <ul className={classes.ul}>

      <li onClick={() => onAuth(PAYMENTLINK_PAGE)} style={{justifyContent: "space-between"}}  className={classes.li}>
        <div className={classes.newdiv}>
          <img src={DispatchIcon}/>
          <div className={classes.typo}><Typography>Gokada Rider</Typography></div> 
        </div>
       <p className={classes.text1}>NGN100</p>
      </li>


      <li onClick={() => onAuth(PAYMENTLINK_PAGE)}  style={{justifyContent: "space-between"}}  className={`${classes.li}`}>
      <div className={classes.newdiv}>
      <img src={maxIcon}/>
        <div className={classes.typo}>
          <Typography>Max Rider</Typography>
        </div>
      </div>  
      <p className={classes.text1}>NGN100</p>
      </li>
 
    </ul>
  );

 
  const walletLink = (
    <ul className={classes.ul}>
      <li onClick={() => onAuth(BANK_PAGE)} className={classes.li}>
       
        <span>Bank</span>
      </li>
    </ul>
  );

  const handleDrawer = (value) => setDrawer(value)
  return (
    <>
      <Header title="Product detail" iconLeft={<ArrowLeft />} />
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={louivitton}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              LOUISVITTON
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Fusion white and blue printed regular fit asymmetric <br />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="black">
            NGN 100
          </Button>
          <Button size="small" color="secondary">
            REMOVE
          </Button>
        </CardActions>
      </Card>
      
        <div className={classes.button1}>
          <ProceedButton onClick={() => handleDrawer(true)} label="proceed" />
        </div>
    
      <Drawer open={isDrawer}>
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
          ) : page === DISPATCHER_PAGE ? (
            <>
              <p className={classes.textHeader}>Select Dispatch Rider</p>
              
            </>
          ) : page === BANK_PAGE ? (
            <>
              <p className={classes.textHeader}>Add bank account</p>
            </>
          ) : page === PAYMENTLINK_PAGE ? (
            <>
              <p className={classes.textHeader}></p>
            </>
          ): (
            <>
            <div>
              <p className={classes.textHeader}>Choose destination address</p>
            </div>
            <div>
            <p className={classes.text}>ADD</p>
            </div>
             
            </>
          )}
        </div>
        {page === LOGIN_PAGE ? (
          <Login onAuth={onAuth}  />
        ) : page === REGISTER_PAGE ? (
          <Register onAuth={onAuth} />
        ) : page === VERIFICATION_PAGE ? (
          <Verification />
        ) : page === WALLET_PAGE ? (
          walletLink
        ) : page === BANK_PAGE ? (
          <Bank  />
        ) : page === DISPATCHER_PAGE ? (
          DispatcherLink
        ) : page === PAYMENTLINK_PAGE ? (
          PaymentLink
        ) : (
          routeLink  
        )}
        
      </Drawer>
    </>
  );
}


export default HOC(MediaCards);
