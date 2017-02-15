import axios from 'axios';

export function createBudget(data) {
  return dispatch => axios.post('/api/budgets/create', data)
    .then((response) => {
      dispatch({ type: 'CREATE_BUDGET_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_BUDGET_FAILED', payload: err.response });
    });
}

export function fetchBudgets({ userId }) {
  return dispatch => axios.get(`/api/budgets?user_id=${userId}`)
    .then((response) => {
      dispatch({ type: 'FETCH_BUDGETS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_BUDGETS_FAILED', payload: err.response });
    });
}