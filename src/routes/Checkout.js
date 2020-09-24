import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Context } from '../AppContext';
import AddressForm from '../components/AddressForm';
import Review from '../components/Review';
import Layout from '../components/Layout';
import { addUser, placeOrder } from '../actions/action1';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Shipping address', 'Review your order'];

function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [oID, setOrderID] = useState(null);
  const [firstName, setfirstName] = useState(); //eslint-disable-line
  const [lastName, setlastName] = useState();//eslint-disable-line
  const [city, setcity] = useState();//eslint-disable-line
  const [disabled, setDisabled] = useState(true);
  const { store } = useContext(Context);

  const handlePlaceOrder = async () => {
    const orderID = await props.placeOrder({ store });
    setOrderID(orderID);
  };
  const handleNext = () => {
    if (activeStep === 0) {
      props.addUser({ firstName, lastName, city });
    } else if (activeStep === 1) {
      handlePlaceOrder();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'firstName') setfirstName(value);
    else if (name === 'lastName') setlastName(value);
    else if (name === 'city') setcity(value);
    if (firstName !== undefined && lastName !== undefined && city !== undefined)
      setDisabled(false);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            handleChange={handleChange}
            values={{ firstName, lastName, city }}
          />
        );
      case 1:
        return (
          <Review cart={props.cart} user={{ firstName, lastName, city }} />
        );
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <Layout title="Oder.ly" showDrawer>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{oID}
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={disabled}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </Layout>
  );
}

Checkout.propTypes = {
  cart: PropTypes.object.isRequired,
  addUser: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired,
};
export default connect(
  (store) => ({
    cart: store.ordersStore.cart,
  }),
  { addUser, placeOrder },
)(Checkout);
