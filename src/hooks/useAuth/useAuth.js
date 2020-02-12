/**
 * The authentication hook
 *
 * Offers:
 * - `<AuthProvider>` - A top level auth provider
 * - `useAuth` - A hook to be called by components
 * - `useAuthStrategy` - An auth strategy of choice
 *
 * @see useAuth.md for details
 */
import React, { useContext, createContext } from "react";

/**
 * Imports the default strategy. This will act as a fallback
 */
import { authDefault } from "./strategies/authDefault";

/**
 * Imports a real strategy which will be used
 */
import { useAuthFinster } from "./strategies/useAuthFinster";

/**
 * Manages the authentication.
 *
 * - Returns the isAuthenticated flag, the user object and the auth methods
 * - Implements an authentication strategy
 */
const useAuthStrategy = strategy => {
  const defaultStrategy = authDefault();
  const finsterStrategy = useAuthFinster();

  switch (strategy) {
    case "finster":
      return finsterStrategy;
    case "none":
    default:
      return defaultStrategy;
  }
};

/**
 * Defines a context where auth is stored and shared
 *
 * - This serves as a cache.
 * - Rather than each instance of the `useAuth` hook fetch the current user, the hook simply calls useContext to get the data from the top level provider
 */
const authContext = createContext();

/**
 * Provides a top level auth wrapper with the auth context
 *
 * - This is the main auth provider
 * - It makes the auth object available to any child component that calls `useAuth`.
 */
const AuthProvider = ({ strategy, children }) => {
  const auth = useAuthStrategy(strategy);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

/**
 * Defines the main hook
 *
 * - Returns the auth context / object
 * - To be used inside components
 */
const useAuth = () => {
  return useContext(authContext);
};

export { useAuth, AuthProvider };
