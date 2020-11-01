import React, { useReducer } from 'react';
import axios from 'axios';
import DocContext from './docContext';
import docReducer from './docReducer';
import moment from 'moment';
import {
  GET_DOCS,
  CLEAR_DOCS,
  ADD_DOC,
  DELETE_DOC,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_DOC,
  DOC_ERROR,
  FILTER_DOCS,
  CLEAR_FILTER,
} from '../types';

const DocState = (props) => {
  const initialState = {
    docs: [],
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(docReducer, initialState);

  // Get Docs
  const getDocs = async () => {
    try {
      const res = await axios.get('/api/documents');
      dispatch({ type: GET_DOCS, payload: res.data });
    } catch (err) {
      dispatch({ type: DOC_ERROR, payload: err.response.msg });
    }
  };

  // Add Doc
  const addDoc = async (doc) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/documents', doc, config);
      dispatch({ type: ADD_DOC, payload: res.data });
    } catch (err) {
      dispatch({ type: DOC_ERROR, payload: err.response.msg });
    }
  };
  // Delete doc
  const deleteDoc = async (id) => {
    try {
      await axios.delete(`/api/documents/${id}`);

      dispatch({ type: DELETE_DOC, payload: id });
    } catch (err) {
      dispatch({ type: DOC_ERROR, payload: err.response.msg });
    }
  };

  // Clear docs from state
  const clearDocs = () => {
    dispatch({ type: CLEAR_DOCS });
  };

  // Set current doc
  const setCurrent = (doc) => {
    doc.licenseStart = moment(doc.licenseStart).format('ll');
    doc.licenseExpire = moment(doc.licenseExpire).format('ll');
    dispatch({ type: SET_CURRENT, payload: doc });
  };

  // Clear current doc
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update doc
  const updateDoc = async (doc) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/documents/${doc._id}`, doc, config);
      dispatch({ type: UPDATE_DOC, payload: res.data });
    } catch (err) {
      dispatch({ type: DOC_ERROR, payload: err.response.msg });
    }
  };

  // Filter docs
  const filterDocs = (text) => {
    dispatch({ type: FILTER_DOCS, payload: text });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <DocContext.Provider
      value={{
        docs: state.docs,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getDocs,
        addDoc,
        updateDoc,
        deleteDoc,
        setCurrent,
        clearCurrent,
        clearDocs,
        filterDocs,
        clearFilter,
      }}>
      {props.children}
    </DocContext.Provider>
  );
};

export default DocState;