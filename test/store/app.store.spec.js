
'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const store = require(process.env.PWD + '/src/store');

lab.experiment('Store', () => {

  lab.test('should have a default state', () => {
    Code.expect(store.getState().title).to.equal('');

    return Promise.resolve();
  });

  lab.test('should update the state with direct dispatch', () => {
    store.dispatch({type: 'SET_TITLE', title: 'new title'});
    Code.expect(store.getState().title).to.equal('new title');

    return Promise.resolve();
  });

  lab.test('should update the with actions creator', () => {
    store.dispatch(store.actions.setTitle('Other new title'));
    Code.expect(store.getState().title).to.equal('Other new title');

    return Promise.resolve();
  });

}); // Store
