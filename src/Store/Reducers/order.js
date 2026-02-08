import * as actiontypes from "../Actions/actionTypes";
import { updateObject } from "./Utility";

const initialstate = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchase: false });
};
const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: false });
};
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });

  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actiontypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actiontypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actiontypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actiontypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actiontypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actiontypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actiontypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};
export default reducer;
