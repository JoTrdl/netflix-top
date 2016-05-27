'use strict';

const redux = require('redux'),
      thunk = require('redux-thunk').default;

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

const actions = require('./actions'),
      reducers = require('./reducers');

const reducer = (state, action) => {
  const update = reducers[action.type] && reducers[action.type](state, action) || null;
  return update || state || INITIAL_STATE;
};

module.exports = redux.createStore(reducer, redux.applyMiddleware(thunk));
module.exports.actions = actions;
