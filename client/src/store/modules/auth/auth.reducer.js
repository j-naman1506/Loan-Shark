import { LOG_OUT_SUCCESS, SIGN_IN_SUCCESS } from "./auth.types";
import Session from "../../../service/session";

const initialState = {
  token: Session.get("token") || undefined,
  userinfo: Session.getObject("userinfo") || undefined,
};

const authReducer = (state = initialState, payload) => {
  const { type, data } = payload;
  switch (type) {
    case SIGN_IN_SUCCESS:
      return { ...state, ...data };
    case LOG_OUT_SUCCESS:
      return { ...state, token: "", userinfo: null };

    default:
      return state;
  }
};

export default authReducer;
