import React from 'react';
import { createUseStyles } from "react-jss";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import louivitton from '../../Assets/louivitton.png';
import { Link } from "react-router-dom";

const useStyles = createUseStyles({

  two: {
    color: "white"
  },
  media: {
    height: 200,
  },
  root: {
    boxShadow: "0px 1px 13px rgba(0, 0, 0, 0.32)",
    borderRadius: "7px"
  }

})



function MediaCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      
        <CardActionArea>
        <Link to="/detail">
            <CardMedia
              className={classes.media}
              image={louivitton}
              title="Contemplative Reptile"
            />
          </Link> 
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="black">
            NGN 100
          </Button>
          <Button size="small" color="primary">
            ADD TO CART
          </Button>
        </CardActions>
     

    </Card>
  );
}


export default MediaCard;