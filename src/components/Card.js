import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  action: {
    justifyContent: 'center',
  },
}));

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={3} lg={3}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="images/logo.svg"
            title="product"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {props.data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.data.description}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              Rs {props.data.price}/-
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.action}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => props.handleAddCart(props.data)}
            className={classes.button}
            startIcon={<AddShoppingCartIcon />}
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

MediaCard.propTypes = {
  data: PropTypes.object.isRequired,
  handleAddCart: PropTypes.func.isRequired,
};
