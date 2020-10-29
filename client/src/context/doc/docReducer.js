import {
  ADD_DOC,
  DELETE_DOC,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_DOC,
  FILTER_DOCS,
  CLEAR_DOCS,
  CLEAR_FILTER,
  DOC_ERROR,
  GET_DOCS,
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_DOCS:
      return {
        ...state,
        docs: action.payload,
        loading: false,
      };

    case ADD_DOC:
      return {
        ...state,
        docs: [action.payload, ...state.docs],
        loading: false,
      };
    case UPDATE_DOC:
      return {
        ...state,
        docs: state.docs.map((doc) =>
          doc._id === action.payload._id ? action.payload : doc
        ),
        loading: false,
      };
    case DELETE_DOC:
      return {
        ...state,
        docs: state.docs.filter((doc) => doc._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        loading: false,
      };
    case FILTER_DOCS:
      return {
        ...state,
        filtered: state.docs.filter((doc) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            doc.name.match(regex) ||
            doc.deviceSerialNumber.match(regex) ||
            doc.deviceType.match(regex) ||
            doc.deviceIP.match(regex) ||
            doc.deviceLocation.match(regex) ||
            doc.licenseStart.match(regex) ||
            doc.licenseExpire.match(regex)
          );
        }),
        loading: false,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false,
      };
    case DOC_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_DOCS:
      return {
        ...state,
        docs: null,
        filterd: null,
        error: null,
        current: null,
      };

    default:
      return state;
  }
};
