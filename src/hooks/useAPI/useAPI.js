import PropTypes from "prop-types";
import queryString from "query-string";
import { Map, fromJS, mergeDeep } from "immutable";

import useData, { getUseDataHookProps } from "../useData";

/**
 * Defines the prop types
 */
const propTypes = {
  path: PropTypes.shape({
    url: PropTypes.string,
    version: PropTypes.string,
    endpoint: PropTypes.string
  }),
  params: PropTypes.shape({
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    init: PropTypes.object,
    queryParams: PropTypes.object
  }),
  defaultData: PropTypes.any
};

/**
 * Defines the default props
 */
const defaultProps = {
  path: {
    url: "http://api.finsterdata.com",
    version: "v1",
    endpoint: "login"
  },
  params: {
    init: {},
    queryParams: {}
  },
  defaultData: "Loading ..."
};

/**
 * Checks if the response is an error
 */
const isApiError = data => {
  return data?.status === "error";
};

/**
 * Returns the error message from the response
 */
const getApiErrorMessage = data => {
  return data?.user_message;
};

/**
 * Returns the token from the response
 */
const getApiToken = data => {
  return data?.token;
};

/**
 * Checks if the API call was made.
 *
 * - Sometimes the underlying data library doesn't makes the API call.
 * - Maybe because of caching, or other errors
 */
const wasApiCallMade = data => {
  return data !== undefined;
};

/**
 * Returns the API call status and a message
 */
const getAPICallStatus = data => {
  if (!wasApiCallMade(data)) {
    return {
      successful: false,
      message: "No API call was made. Please try again later."
    };
  }

  if (isApiError(data)) {
    return {
      successful: false,
      message: getApiErrorMessage(data)
    };
  }

  return {
    successful: true,
    message: "API request was successful"
  };
};

/**
 * Deep merges various API props to form the final params
 *
 * - requestProps - the request specific props, usually defined in the caller component's PropTypes
 * - requestLiveProps - the request specific props which, defined inside the component
 */
const mergeAPIParams = props => {
  const { requestProps, requestLiveProps } = props;

  return mergeDeep(
    fromJS(defaultProps),
    fromJS(requestProps),
    fromJS(requestLiveProps)
  ).toJS();
};

/**
 * A general fetcher function
 *
 * - Both `SWR` and `react-async` are built on `fetch`
 */
const fetcher = async ({ props }) => {
  const { path, params } = props;
  const { url, version, endpoint } = path;
  const { init, queryParams } = params;

  const encodedQueryParams = Map.isMap(fromJS(queryParams))
    ? `?${queryString.stringify(queryParams)}`
    : "";
  const pathToResource = `${url}/${version}/${endpoint}${encodedQueryParams}`;

  // TODO: `init` won't work as the 2nd param
  const response = await fetch(pathToResource);

  /**
   * With this API (Finster) we just simply return the response
   * The response always includes the errors, if there are any
   * No need to complicate with throwing errors here
   * When error is used the components can enter in infinite rendering because their state gets updated continuously
   */
  return response.json();
};

/**
 * Displays the component
 */
const useAPI = props => {
  const { path, params, initialData } = props;

  /**
   * This is useData strategy specific ...
   * // TODO: Make it strategy independent
   */
  const { data } = useData(
    getUseDataHookProps({
      options: {
        promiseFn: fetcher,
        promiseFnParams: { props: { path: path, params: params } },
        initialValue: initialData
      }
    })
  );

  return { data };
};

useAPI.propTypes = propTypes;
useAPI.defaultProps = defaultProps;

export default useAPI;
export {
  isApiError,
  getApiErrorMessage,
  getApiToken,
  mergeAPIParams,
  getAPICallStatus,
  propTypes as useAPIPropTypes,
  defaultProps as useAPIDefaultProps
};
