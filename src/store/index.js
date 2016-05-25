'use strict';

const redux = require('redux');
const INITIAL_STATE = (typeof STORE != 'undefined') ? STORE : {
  title: '',
  category: '',
  rendered: false,
  items: {
    isFetching: false,
    hasError: false,
    data: []
  }
};

const actions = {
  'UPDATE_TITLE': (state, action) => {
    return Object.assign({}, state, {title: action.data});
  },
  'SERVER_RENDERED': (state, action) => {
    return Object.assign({}, state, {rendered: true});
  },
  'UPDATE_CATEGORY': (state, action) => {
    return Object.assign({}, state, {category: action.data});
  },
  'FETCH_INIT': (state, action) => {
    return Object.assign({}, state, {
      items: {
        isFetching: true,
        hasError: false
      }
    });
  },
  'FETCH_SUCCESS': (state, action) => {
    return Object.assign({}, state, {
      title: action.data.title,
      items: {
        isFetching: false,
        hasError: false,
        data: action.data.items
      }
    });
  },
  'FETCH_ERROR': (state, action) => {
    return Object.assign({}, state, {
      items: {
        isFetching: false,
        hasError: true,
        data: action.data
      }
    });
  }
};

const reducer = (state, action) => {
  const update = actions[action.type] && actions[action.type](state, action) || null;
  return update || state || INITIAL_STATE;
};

module.exports = redux.createStore(reducer);