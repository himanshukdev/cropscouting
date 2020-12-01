// Library Imports
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

// InApp Imports
import App from "./reducers/App";

export const history = createBrowserHistory();
const routerMiddlewareHistory = routerMiddleware(history);

const middlewares = [thunk, routerMiddlewareHistory];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    app: App
  });

// redux store configuration enhanced with Thunk And routerMiddlewaare
export default function configureStore(initialState) {
  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return store;
}
