import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Context } from '../../AppContext';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { fetchCatalogue, addCart } from '../../actions/action1';
// import { toCapitalize } from '../../utils/HelperMethods';

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    height: '90%',
  },
}));

function Home(props) {
  const classes = useStyles();

  const { store } = useContext(Context);
  const [products, setProducts] = useState(props.orders);
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    await props.fetchCatalogue();
  }, []);

  useEffect(() => {
    setProducts(props.orders);
  });

  const onSearch = (event) => {
    const keyword = event.target.value;
    const items = [...props.orders];
    const filteredProducts = items.filter((item) => {
      const title = item.title.toLowerCase();
      return title.indexOf(keyword) > -1;
    });
    setProducts(filteredProducts);
  };

  const displaySnackBar = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={2000}
      onClose={() => {
        setOpen(false);
      }}
      message="Product Added to cart"
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );

  const handleAddCart = (order) => {
    setOpen(true);
    props.addCart({ store, order });
  };
  return (
    <Layout
      title="Oder.ly"
      showDrawer
      showAction
      cartBadge={props.cart.length}
      onSearch={onSearch}
    >
      {products.length ? (
        <Grid container spacing={3} className={classes.container}>
          {products.map((order) => (
            <Card data={order} handleAddCart={handleAddCart} />
          ))}
        </Grid>
      ) : (
        <Box
          justifyContent="center"
          display="flex"
          flexGrow={1}
          height="100%"
          alignItems="center"
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {displaySnackBar()}
    </Layout>
  );
}

Home.propTypes = {
  orders: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired,
  addCart: PropTypes.func.isRequired,
  fetchCatalogue: PropTypes.func.isRequired,
};

export default connect(
  (store) => ({
    orders: store.ordersStore.orders,
    cart: store.ordersStore.cart,
  }),
  {
    fetchCatalogue,
    addCart,
  },
)(Home);
