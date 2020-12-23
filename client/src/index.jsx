import React from "react";
import ReactDOM from "react-dom";

import "./scss/index.scss";
import App from "./App";

import allReducer from "./_reducers";
import * as actions from "./_actions";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

if (process.env.NODE_ENV === "development") {
  const composeEnhancers = composeWithDevTools({
    actions,
    trace: true,
    traceLimit: 25,
  });

  var store = createStore(allReducer, composeEnhancers(applyMiddleware()));
} else {
  store = createStore(allReducer);
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
