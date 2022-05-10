import { SIGN_IN_SUCCESS, LOG_OUT_SUCCESS } from "./auth.types";
import Session from "../../../service/session";

export const signInSuccess = (data) => (dispatch) => {
  Session.set("token", data.token);
  Session.setObject("userinfo", data.userinfo);

  dispatch(
    {
      data,
      type: SIGN_IN_SUCCESS,
    },
    () => {}
  );
};

export const logOutSuccess = () => (dispatch) => {
  Session.remove("token");
  Session.remove("userinfo");
  dispatch({
    type: LOG_OUT_SUCCESS,
  });
};
