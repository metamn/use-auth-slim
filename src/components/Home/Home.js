import React from "react";
import PropTypes from "prop-types";

import { useAuth } from "./../../hooks";

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

  const buttons = isAuthenticated ? (
    <button>Logout</button>
  ) : (
    <>
      <button>Login</button>
      <button>Register</button>
    </>
  );

  return (
    <div className="Home">
      <h3>Home</h3>
      <ul>
        <li>isAuthenticated: {JSON.stringify(isAuthenticated)}</li>
        <li>Token: {token}</li>
        <li>Strategy: {strategy}</li>
        <li>Message: {message}</li>
      </ul>
      {buttons}
    </div>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes as HomePropTypes, defaultProps as HomeDefaultProps };
