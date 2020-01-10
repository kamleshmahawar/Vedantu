import axios from 'axios';

let repos = [];
export const initialState = {
  user: {},
  repos: [],
}

const url = 'https://api.github.com/users/supreetsingh247';
export const reducerName = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return { ...state, user: action.data };
    case 'FETCH_REPOS':
      return { ...state, repos: action.data };
    default:
      return state;
  }
}

export const fetchUser = () => {
  return (dispatch) =>
    axios.get(url).then((res) => {
      dispatch({ type: 'FETCH_USER', data: res.data })
    });
}

export const searchRepo = (query, type) => {
  return (dispatch) => {
    let actualData = [...repos];
    actualData = actualData.filter(i => {
      if(i[type]) {
         return i[type].toUpperCase().indexOf(query.toUpperCase()) > -1;
      }
      return false;
    })
    dispatch({ type: 'FETCH_REPOS', data: actualData })
  }
}

export const fetchRepos = () => {
  return (dispatch) =>
    axios.get(url + '/repos').then((res) => {
      repos = [...res.data];
      dispatch({ type: 'FETCH_REPOS', data: res.data });
    });
}
