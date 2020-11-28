import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import reducers from "../src/components/Redux/Reducers";
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(ReduxThunk))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root"));
