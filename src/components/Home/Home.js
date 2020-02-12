import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { useAuth } from "./../../hooks";

import Login from "../Login";
import Register from "../Register";
import Subscriptions from "../Subscriptions";

/**
 * Defines the prop types
 */
const propTypes = {};

/**
 * Defines the default props
 */
const defaultProps = {};

/**
 * Displays the component
 */
const Home = props => {
  const { isAuthenticated, token, message, strategy } = useAuth();

  return (
    <div className="Home">
      <h3>Home</h3>
      <ul>
        <li>isAuthenticated: {JSON.stringify(isAuthenticated)}</li>
        <li>Token: {token}</li>
        <li>Strategy: {strategy}</li>
        <li>Message: {message}</li>
      </ul>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/subscriptions">Subscriptions</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">xxx</Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/subscriptions">
            <Subscriptions />
          </Route>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes as HomePropTypes, defaultProps as HomeDefaultProps };
