import { SHOW_LOADING, HIDE_LOADING } from "./app.types";
const initialState = {
  loading: false,
};

const appReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SHOW_LOADING:
      return { ...state, loading: true };
    case HIDE_LOADING:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default appReducer;
