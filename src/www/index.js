
import 'skeleton-scss/scss/skeleton.scss';
import './style';

if (ENV === 'production') {
  require('offline-plugin/runtime').install();
}

// Seet flags in window
window.IS_CLIENT = true;
window.IS_SERVER = false;

// Require all tags
const req = require.context("./tags", true, /\.tag$/);
req.keys().forEach((key) => req(key));

const store = require('store');
const colorchart = require('colorchart')();

document.addEventListener('DOMContentLoaded', () => {
  riot.mount('*', {
    store: store, 
    colorchart: colorchart
  });
});