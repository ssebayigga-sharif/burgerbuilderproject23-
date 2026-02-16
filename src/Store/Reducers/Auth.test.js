import * as actionTypes from "../Actions/actionTypes";
import reducer from "./Auth";

describe("Auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should handle AUTH_START", () => {
    expect(reducer(undefined, { type: actionTypes.AUTH_START })).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: true,
      authRedirectPath: "/",
    });
  });

  it("should handle AUTH_SUCCESS", () => {
    expect(
      reducer(undefined, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: "token",
        userId: "userId",
      }),
    ).toEqual({
      token: "token",
      userId: "userId",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should handle AUTH_FAIL", () => {
    expect(
      reducer(undefined, { type: actionTypes.AUTH_FAIL, error: "error" }),
    ).toEqual({
      token: null,
      userId: null,
      error: "error",
      loading: false,
      authRedirectPath: "/",
    });
  });
});
