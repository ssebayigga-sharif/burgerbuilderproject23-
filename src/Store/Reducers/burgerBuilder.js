import * as actionTypes from "../Actions/actionTypes";
// import { fetchIngredientsFailed } from "../Actions/burgerBuilder";
import { updateObject } from "../../shared/Utility";
//our initial state
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};
const INGREDIENTD_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    building: true,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTD_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedRemoveIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    building: true,
  };
  const updatedRemoveIngredients = updateObject(
    state.ingredients,
    updatedRemoveIngredient,
  );
  const updatedRemoveState = {
    ingredients: updatedRemoveIngredients,
    totalPrice: state.totalPrice - INGREDIENTD_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedRemoveState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: 4,
    building: false,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};
//the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    //adding ingredients
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    //removing ingredients
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
