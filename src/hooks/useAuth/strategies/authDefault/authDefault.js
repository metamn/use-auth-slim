/**
 * The default authentication strategy
 *
 * @see authDefault.md for details
 */
import PropTypes from "prop-types";

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
  strategy: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  isAuthenticated: false,
  user: {},
  token: "",
  message: "Just for demo purposes",
  strategy: "none (default)"
};

/**
 * Displays the component
 */
const authDefault = props => {
  return defaultProps;
};

authDefault.propTypes = propTypes;
authDefault.defaultProps = defaultProps;

export { authDefault };
