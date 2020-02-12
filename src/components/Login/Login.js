import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  useAuth,
  useAPI,
  useAPIPropTypes,
  isApiError,
  getApiErrorMessage,
  mergeAPIParams
} from "../../hooks";

/**
 * Defines the prop types
 */
const propTypes = {
  apiCall: PropTypes.shape(useAPIPropTypes)
};

/**
 * Defines the default props
 */
const defaultProps = {
  apiCall: {
    path: {
      endpoint: "login"
    },
    params: {
      queryParams: {
        email: "p.schinkel+5@vacat.nl",
        password: "test123"
      }
    },
    defaultData: "Logging in ..."
  }
};

/**
 * Displays the component
 */
const Login = props => {
  const { apiCall } = props;

  const { login } = useAuth();

  const [results, setResults] = useState({});
  const [message, setMessage] = useState("No message");

  const params = mergeAPIParams({ requestProps: apiCall });
  const { data } = useAPI(params);

  useEffect(() => {
    if (isApiError(data)) {
      setMessage(getApiErrorMessage(data));
    } else {
      setResults(data);
      login(data);
      setMessage("API request was successful");
    }
  }, [data]);

  return (
    <div className="Login">
      <h3>Login</h3>
      <ul>
        <li>Login: {JSON.stringify(results)}</li>
        <li>Message: {JSON.stringify(message)}</li>
      </ul>
    </div>
  );
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
export { propTypes as LoginPropTypes, defaultProps as LoginDefaultProps };
