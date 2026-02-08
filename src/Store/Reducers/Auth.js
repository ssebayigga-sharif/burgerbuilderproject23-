import * as actinTypes from "../Actions/actionTypes";
import { updateObject } from "./Utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userid,
    error: null,
    loading: false,
  });
};
const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actinTypes.AUTH_START:
      return authStart(state, action);
    case actinTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actinTypes.AUTH_FAIL:
      return authFail(state, action);
    case actinTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
