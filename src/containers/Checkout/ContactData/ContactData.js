import { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../AxiosOrders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/input";
import { connect } from "react-redux";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../../Store/Actions";
import { updateObject, checkValidity } from "../../../shared/Utility";
class ContactData extends Component {
  state = {
    orderForm: {
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
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentiier in this.state.orderForm) {
      formData[formElementIdentiier] =
        this.state.orderForm[formElementIdentiier].value;
    }

    console.log(this.props.ings);

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updateObject(this.state.orderForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation,
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
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    let formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
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
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          );
        })}
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4 style={{ fontWeight: "bold" }}>Enter your contact data</h4>

        {form}
        <Button
          btntype="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </div>
    );
  }
}

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
