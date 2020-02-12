export { useAuth, AuthProvider } from "./useAuth/useAuth";
export { default as useLocalStorage } from "./useLocalStorage/useLocalStorage";
export {
  default as useData,
  useDataPropTypes,
  useDataDefaultProps,
  getUseDataHookProps,
  getUseDataInitialValue
} from "./useData";
export {
  default as useAPI,
  useAPIPropTypes,
  useAPIDefaultProps,
  isApiError,
  getApiErrorMessage,
  mergeAPIParams,
  getAPICallStatus
} from "./useAPI";
