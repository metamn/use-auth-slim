import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  useAuth,
  useAPI,
  useAPIPropTypes,
  mergeAPIParams,
  getAPICallStatus
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
      endpoint: "subscription.php?action=list"
    },
    defaultData: "Loading subscriptions"
  }
};

/**
 * Displays the component
 */
const Subscriptions = props => {
  const { apiCall } = props;
  const { token } = useAuth();

  const [results, setResults] = useState({});
  const [message, setMessage] = useState("No message");

  const params = mergeAPIParams({
    requestProps: apiCall,
    requestLiveProps: {
      params: { init: { body: JSON.stringify({ token: token }) } }
    }
  });

  const { data } = useAPI(params);

  useEffect(() => {
    const { successful, message } = getAPICallStatus(data);

    if (successful) {
      setResults(data);
    }

    setMessage(message);
  }, [data]);

  return (
    <div className="Subscriptions">
      <h3>Subscriptions</h3>
      <ul>
        <li>Subscriptions: {JSON.stringify(results)}</li>
        <li>Message: {JSON.stringify(message)}</li>
      </ul>
    </div>
  );
};

Subscriptions.propTypes = propTypes;
Subscriptions.defaultProps = defaultProps;

export default Subscriptions;
export {
  propTypes as SubscriptionsPropTypes,
  defaultProps as SubscriptionsDefaultProps
};
