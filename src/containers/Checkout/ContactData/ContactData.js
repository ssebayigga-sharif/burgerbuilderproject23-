import { Component, useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../AxiosOrders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/input";
import { connect } from "react-redux";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../../Store/Actions";
import { updateObject, checkValidity } from "../../../shared/Utility";
const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "your name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip code",
      },
      value: "",
      validation: {
        required: true,
        minlength: 5,
        maxlength: 6,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-mail",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliverlyMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "cheap", displayValue: "fast" },
          { value: "moderate", displayValue: "faster" },
          { value: "Expensive", displayValue: "fastest" },
        ],
      },
      value: "Morethan",
      valid: true,
      validation: {},
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentiier in orderForm) {
      formData[formElementIdentiier] = orderForm[formElementIdentiier].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updateObject(orderForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          orderForm[inputIdentifier].validation,
        ),
      }),
    });
    const updateFormElement = updateObject(
      updatedOrderForm[inputIdentifier],

      {
        ...updatedOrderForm[inputIdentifier],
      },
    );

    //is the form valid

    let formIsValid = true;

    for (let updatedeIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[updatedeIdentifier].valid && formIsValid;
    }
    updateFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updateFormElement;
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  let formElementArray = [];
  for (let key in orderForm) {
    formElementArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementArray.map((formElement) => {
        return (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={(event) => inputChangedHandler(event, formElement.id)}
          />
        );
      })}
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4 style={{ fontWeight: "bold" }}>Enter your contact data</h4>

      {form}
      <Button btntype="Success" clicked={orderHandler} disabled={!formIsValid}>
        ORDER
      </Button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithErrorHandler(ContactData, axios));
