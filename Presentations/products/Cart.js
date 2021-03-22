import React from 'react';
import Header from '../../Atoms/header';
import { ArrowLeft, ArrowNarrowRight} from "heroicons-react";
import cloth from '../../Assets/cloth.png'
import { createUseStyles } from "react-jss";
import { Typography } from '@material-ui/core';
import { arrowLeft} from "heroicons-react";
import { arrowNarowRight} from "heroicons-react";
import { Link } from 'react-router-dom';
import Button from '../../Atoms/button';



const useStyles = createUseStyles({
    cloth: {
        
    },
    both: {
        display: "flex",
        margin: "15px"
    },
    price: {
        fontWeight: "bold",
        
    },
    bothprice: {
        display: "flex",
        justifyContent:"space-between"
    },
    link: {
        textDecoration: "none",
        color:"red"
    },
    button: {
        position:"absolute",
        bottom: "9px",
        width: '10%',
        textAlign: 'center',
     
    }
})




const Cart = () => {
    const classes = useStyles();
    return(
        <div>
            <Header title="Cart" iconLeft={<ArrowLeft/>}   /> 
            <div className={classes.both}>
                <div className={classes.cloth}>
                    <img src={cloth} alt="cloth1"width="90%" height="130px"/>
                </div> 

                <div>
                    <Typography  variant="body1" color="textSecondary" component="p">
                        Fusion white and blue  printed  <br/>regular   fit asymetric <br/>
                    </Typography>    
                        <div className={classes.bothprice}>
                            <div>
                                <h2 className={classes.price}>NGN 100</h2><br/>
                                <Typography  variant="body1" color="textSecondary" component="p">
                                    <ArrowLeft /> 1 <ArrowNarrowRight />
                                </Typography>
                                
                            </div>
                            <div>
                                <Typography variant="body1" color="textSecondary" component="p">
                                    <h4 className={classes.price}>NGN 100</h4>
                                </Typography>
                                
                                <a className={classes.link} href="#">Remove</a>
                            </div>
                        </div>
                        <Link to="">
                            <div  className={classes.button}>
                                    <Button label="Proceed" />
                            </div>
                        </Link>
                        
                    
                </div>
            </div>    
        </div>
    )
}

export default Cart;