
import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import configureStore, { history } from "./store";
import Main from "../src/containers/Home/Main";
import './App.css';

function App() {
  const store = configureStore();
  return (
   
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={Main} />
            {/* <Route path="/home" component={Main} /> */}
          </Switch>
        </ConnectedRouter>
      </Provider>
  );
}

export default App;
