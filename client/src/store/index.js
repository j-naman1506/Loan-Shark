import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./modules/auth/auth.reducer";
import appReducer from "./modules/application/app.reducer";

const rootReducer = combineReducers({ auth: authReducer, app: appReducer });

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
