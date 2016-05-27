'use strict';

const fetch = require('isomorphic-fetch');

let actions = {};

actions.setTitle = function(title) {
  return {
    type: 'SET_TITLE',
    title
  };
};

actions.updateCategory = function(category, baseURL) {
  return function(dispatch) {
    dispatch({type: 'UPDATE_CATEGORY', category}),
    dispatch({type: 'FETCH_INIT'});
    return fetch((baseURL || '') + '/feed/' + category)
      .then((response) => response.json())
      .then((data) => dispatch({type: 'FETCH_SUCCESS', data: data}))
      .catch((e) => dispatch({type: 'FETCH_ERROR', error: e}))
  };
};

module.exports = actions;
