import axios from 'axios';

export function linkAccount(data) {
  return dispatch => axios.post('/api/accounts/create', data)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      dispatch({ type: 'LINK_ACCOUNT_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'LINK_ACCOUNT_FAILED', payload: err.response });
    });
}

export function fetchAccounts({ userId }) {
  return dispatch => axios.get(`/api/accounts?user_id=${userId}`)
    .then((response) => {
      dispatch({ type: 'FETCH_ACCOUNTS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_ACCOUNTS_FAILED', payload: err.response });
    });
}
