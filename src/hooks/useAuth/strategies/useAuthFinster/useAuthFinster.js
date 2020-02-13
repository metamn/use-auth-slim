/**
 * A special authentication strategy
 *
 * @see useAuthFinster.md for details
 */
import { useState, useEffect, useRef } from "react";
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
   * Returns an authentication token
   */
  token: PropTypes.string,
  /**
   * Defines the key for storing the token in local storage
   */
  localStorageKeyToken: PropTypes.string,
  /**
   * Tells if the user is authenticated
   */
  isAuthenticated: PropTypes.bool,
  /**
   * Returns a status message
   */
  message: PropTypes.string,
  /**
   * The authentication strategy
   */
  strategy: PropTypes.string
};

/**
 * Defines the default return values
 */
const defaultReturns = {
  token: "",
  localStorageKeyToken: "localStorageKeyToken",
  isAuthenticated: false,
  message: "The finster auth strategy",
  strategy: "finster"
};

/**
 * Displays the component
 */
const useAuthFinster = props => {
  const {
    localStorageKeyToken,
    message: messageFromProps,
    token: tokenFromProps,
    strategy
  } = defaultReturns;

  /**
   * Loads the default return values
   *
   * - Tries to derive `token` and `isAuthenticated` from `tokenLocalStorage`
   * - But it was impossible:
   * 	- `useLocalStorage` doesn't behaves like `useState` so token has to be saved separately into a state variable
   * 	- isAuthenticatedRef.current is updated by `useEffect` but an older value is returned at the end:
   * 	return { isAuthenticated: isAuthenticatedRef.current, ...}
   */
  const isAuthenticatedRef = useRef(false);

  /**
   * Manages the token
   *
   * - The token is saved into local storage
   */
  const [tokenLocalStorage, setTokenLocalStorage] = useLocalStorage(
    localStorageKeyToken,
    tokenFromProps
  );

  const [token, setToken] = useState(tokenLocalStorage);

  /**
   * Updates the retun values on token change
   */
  useEffect(() => {
    isAuthenticatedRef.current = token !== tokenFromProps;
  }, [token]);

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
    setMessage("Successful logout");
  };

  return {
    isAuthenticated: isAuthenticatedRef.current,
    token,
    message,
    login,
    logout,
    register,
    strategy
  };
};

export { useAuthFinster };
