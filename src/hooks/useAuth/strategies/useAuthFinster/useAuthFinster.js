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
  localStorageKeyAuth: PropTypes.string,
  /**
   * Defines the key for storing the token in local storage
   */
  localStorageKeyToken: PropTypes.string
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
  localStorageKeyAuth: "localStorageKeyAuth",
  localStorageKeyToken: "localStorageKeyToken"
};

/**
 * Displays the component
 */
const useAuthFinster = props => {
  const {
    localStorageKeyAuth,
    localStorageKeyToken,
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
  ] = useLocalStorage(localStorageKeyAuth, false);

  /**
   * Checks local storage if the token is saved
   */
  const [tokenLocalStorage, setTokenLocalStorage] = useLocalStorage(
    localStorageKeyToken,
    tokenFromProps
  );

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
   * - First it is populated with the value from the local storage
   */
  const [token, setToken] = useState(tokenLocalStorage);

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
      setTokenLocalStorage(newToken);
      setToken(newToken);
      setIsAuthenticatedLocalStorage(true);
      setIsAuthenticated(true);
      setMessage("Successful login");
    } else {
      setMessage("Unsuccessful login");
    }
  };

  /**
   * Defines the register function
   *
   * - `data` is the result of the login API call
   */
  const register = data => {
    const newToken = getApiToken(data);
    if (newToken) {
      setTokenLocalStorage(newToken);
      setToken(newToken);
      setIsAuthenticatedLocalStorage(true);
      setIsAuthenticated(true);
      setMessage("Successful registration");
    } else {
      setMessage("Unsuccessful registration");
    }
  };

  /**
   * Defines the logout function
   */
  const logout = () => {
    setTokenLocalStorage(tokenFromProps);
    setToken(tokenFromProps);
    setIsAuthenticated(false);
    setIsAuthenticatedLocalStorage(false);
    setMessage("Successful logout");
  };

  return { isAuthenticated, token, message, login, logout, register, strategy };
};

export { useAuthFinster };
