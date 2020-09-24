import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  let totalPrice = 0;
  props.cart.forEach((e) => {
    totalPrice += e.totalPrice;
  });
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.cart.map((product) => (
          <Grid spacing={2}>
            <ListItem className={classes.listItem} key={product.title}>
              <ListItemAvatar>
                <Avatar src="/images/logo.svg" />
              </ListItemAvatar>
              <ListItemText
                primary={product.title}
                secondary={product.description}
              />
              <Typography variant="body2">Rs {product.price}/-</Typography>
            </ListItem>
            <ListItem className={classes.listItem} key={product.quantity}>
              <ListItemText secondary="Quantity" />
              <Typography variant="body2">x{product.quantity}</Typography>
            </ListItem>
            <ListItem className={classes.listItem} key={product.totalPrice}>
              <ListItemText secondary="Total Price" />
              <Typography variant="body2">Rs {product.totalPrice}</Typography>
            </ListItem>
            <Divider />
          </Grid>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            Rs {totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {props.user.firstName} {props.user.lastName}
          </Typography>
          <Typography gutterBottom>{props.user.city}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

Review.propTypes = {
  cart: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};
