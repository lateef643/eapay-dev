import React from 'react';
import Header from '../../Atoms/header';
import louivitton from '../../Assets/louivitton.png';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '../../Atoms/button';
import { createUseStyles } from "react-jss";
import { ArrowLeft} from "heroicons-react";
import { Link } from 'react-router-dom';



const useStyles = createUseStyles({
    button: {
        position:"absolute",
        bottom: "9px",
        width: '100%',
        textAlign: 'center',
     
    }
})


export default function Detail() {
    const classes = useStyles();
    return (
        <>
            <div>
                <Header title="Product detail" iconLeft={<ArrowLeft/>}  />  
                <img src={louivitton} alt="shoe1" height="250px" width="100%"/>
            </div>
        
            <Container>
                <div>
                    <figcaption>LOUISVITTON</figcaption>
                    <h3>NGN 100</h3>
                    <Typography variant="body2" color="textSecondary" component="p">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
                    </Typography>
                    
                   
                </div>
               

            </Container>
            <Link to="/Cart">
                    <div  className={classes.button}>
                            <Button label="Add to Cart" />
                    </div>
            </Link>
          
        </>
        
     
    );
  }