import { applyMiddleware, compose, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import { saveCartStateToLocalStorage } from "../services/utils/localStorageUtils";
import { throttle } from "lodash";
import thunk from "redux-thunk";

const isDevEnvironment = process.env.NODE_ENV === "development";

const composer = isDevEnvironment ? composeWithDevTools : compose;

const enhancers = composer(applyMiddleware(thunk));

const store = createStore(reducers, enhancers);

store.subscribe(
	throttle(() => {
		saveCartStateToLocalStorage({ cart: store.getState().cart });
	}, 2000)
);

export default store;
