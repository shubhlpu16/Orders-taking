import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Context } from '../AppContext';
import Layout from '../components/Layout';
import { updateCart } from '../actions/action1';
// import { toCapitalize } from '../../utils/HelperMethods';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

function Cart(props) {
  const classes = useStyles();

  const { store } = useContext(Context);
  const { cart } = store.getState().ordersStore;
  let totalPrice = 0;
  cart.forEach((e) => {
    totalPrice += e.totalPrice;
  });

  const updateCartItem = (product, operator) => {
    props.updateCart({ store, product, operator });
  };

  return (
    <Layout title="Oder.ly" showDrawer cartBadge={cart.length}>
      {cart.length ? (
        <Paper className={classes.container}>
          <List disablePadding>
            {cart.map((product) => (
              <Grid>
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
                  <IconButton
                    color="primary"
                    className={classes.marginLeft}
                    onClick={() => updateCartItem(product, 'dec')}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body2" color="secondary">
                    {product.quantity}
                  </Typography>
                  <IconButton
                    color="primary"
                    className={classes.marginLeft}
                    onClick={() => updateCart(product, 'inc')}
                  >
                    <AddIcon />
                  </IconButton>
                </ListItem>
                <ListItem className={classes.listItem} key={product.totalPrice}>
                  <ListItemText secondary="Total Price" />
                  <Typography variant="body2">
                    Rs {product.totalPrice}
                  </Typography>
                </ListItem>
                <Divider variant="middle" />
              </Grid>
            ))}
            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                Rs {totalPrice}
              </Typography>
            </ListItem>
          </List>
          <Box
            justifyContent="center"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Button variant="outlined" color="secondary" href="/checkout">
              Checkout
            </Button>
          </Box>
        </Paper>
      ) : (
        <Box
          height="50%"
          justifyContent="center"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h5" className={classes.total}>
            Cart is Empty!
          </Typography>
          <Typography variant="body2">Do some shopping</Typography>
        </Box>
      )}
    </Layout>
  );
}

Cart.propTypes = { updateCart: PropTypes.func.isRequired };

export default connect(
  (store) => ({
    cart: store.ordersStore.cart,
  }),
  { updateCart },
)(Cart);
