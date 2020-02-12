/**
 * The default authentication strategy
 *
 * @see useAuthFinster.md for details
 */
import { useState } from "react";
import PropTypes from "prop-types";

import useLocalStorage from "../../../useLocalStorage";
import { getApiToken } from "../../../useAPI";

/**
 * Defines the prop types for the return values
 *
 * - Just fyi ...
 */
const returnTypes = {
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
 * Defines the default return values
 */
const defaultReturns = {
  isAuthenticated: false,
  user: {},
  token: "",
  message: "The finster auth strategy",
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
  } = defaultReturns;

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

  /**
   * Defines the login function
   *
   * - `data` is the result of the login API call
   */
  const login = data => {
    const newToken = getApiToken(data);
    if (newToken) {
      setToken(newToken);
      setMessage("Login successful");
      setIsAuthenticated(true);
      setIsAuthenticatedLocalStorage(true);
    }
  };

  /**
   * Defines the logout function
   */
  const logout = () => {
    setToken(tokenFromProps);
    setIsAuthenticated(false);
    setIsAuthenticatedLocalStorage(false);
    setMessage("Logout successful");
  };

  return { isAuthenticated, token, message, login, logout, strategy };
};

export { useAuthFinster };
