import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  useAuth,
  useAPI,
  useAPIPropTypes,
  getAPICallStatus,
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
      endpoint: "register"
    },
    params: {
      queryParams: {
        name: "test3",
        email: "test3@test.com",
        password: "test12345",
        recaptcha_ignore: "293kwlxh"
      }
    },
    defaultData: "Registering ..."
  }
};

/**
 * Displays the component
 */
const Register = props => {
  const { apiCall } = props;

  const { register } = useAuth();

  const [results, setResults] = useState({});
  const [message, setMessage] = useState("No message");

  const params = mergeAPIParams({ requestProps: apiCall });
  const { data } = useAPI(params);

  useEffect(() => {
    const { successful, message } = getAPICallStatus(data);

    if (successful) {
      setResults(data);
      register(data);
    }

    setMessage(message);
  }, [data, register]);

  return (
    <div className="Register">
      <h3>Register</h3>
      <ul>
        <li>Register: {JSON.stringify(results)}</li>
        <li>Message: {JSON.stringify(message)}</li>
      </ul>
    </div>
  );
};

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;
export { propTypes as RegisterPropTypes, defaultProps as RegisterDefaultProps };
