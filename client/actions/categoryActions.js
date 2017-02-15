import axios from 'axios';

export function createCategory(data) {
  return dispatch => axios.post('/api/categories/create', data)
    .then((response) => {
      dispatch({ type: 'CREATE_CATEGORY_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_CATEGORY_FAILED', payload: err.response });
    });
}

export function fetchCategories() {
  return dispatch => axios.get('/api/categories')
    .then((response) => {
      dispatch({ type: 'FETCH_CATEGORIES_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_CATEGORIES_FAILED', payload: err.response });
    });
}
