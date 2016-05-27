
module.exports = {
  'SET_TITLE': (state, action) => {
    return Object.assign({}, state, {title: action.title});
  },
  'UPDATE_CATEGORY': (state, action) => {
    return Object.assign({}, state, {category: action.category});
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
        data: action.error
      }
    });
  }
};
