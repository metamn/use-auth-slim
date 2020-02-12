/**
 * The default authentication strategy
 *
 * @see useAuthFinster.md for details
 */
import { useState } from "react";
import PropTypes from "prop-types";

import useLocalStorage from "../../../useLocalStorage";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * Tells if the user is authenticated
   */
  isAuthenticated: PropTypes.bool,
  /**
   * Returns the user object
   */
  user: PropTypes.object,
  /**
   * Returns an authentication token
   */
  token: PropTypes.string,
  /**
   * Returns a status message
   */
  message: PropTypes.string,
  /**
   * The authentication strategy
   */
  strategy: PropTypes.string,
  /**
   * Defines the key for storing auth status in local storage
   */
  localStorageKey: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  isAuthenticated: false,
  user: {},
  token: "",
  message: "Just for demo purposes",
  strategy: "finster",
  localStorageKey: "localStorageKey"
};

/**
 * Displays the component
 */
const useAuthFinster = props => {
  const {
    localStorageKey,
    token: tokenFromProps,
    message: messageFromProps,
    strategy
  } = defaultProps;

  /**
   * Checks local storage if the user is authenticated already
   */
  const [
    isAuthenticatedLocalStorage,
    setIsAuthenticatedLocalStorage
  ] = useLocalStorage(localStorageKey, false);

  /**
   * Manages auth state
   *
   * - First it is populated with the value from the local storage
   */
  const [isAuthenticated, setIsAuthenticated] = useState(
    isAuthenticatedLocalStorage
  );

  /**
   * Manages the token
   *
   * - First it is populated with the value from the props
   */
  const [token, setToken] = useState(tokenFromProps);

  /**
   * Manages the status message
   *
   * - First it is populated with the value from the props
   */
  const [message, setMessage] = useState(messageFromProps);

  return { isAuthenticated, token, message, strategy };
};

useAuthFinster.propTypes = propTypes;
useAuthFinster.defaultProps = defaultProps;

export { useAuthFinster };
