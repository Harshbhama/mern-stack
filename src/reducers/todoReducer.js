import axios from "axios"
const initialState = {
  todos: [],
  todo_description: '',
  search: false,
  display: false
}

export const VIEW_DATA_SUCCESS = 'VIEW_DATA_SUCCESS'
export const SEARCH_CHANGE_DESCRIPTION = 'SEARCH_CHANGE_DESCRIPTION'
export const  SEARCH_STATUS = 'SEARCH_STATUS'

export const DISPLAY_STATUS = 'DISPLAY_STATUS'

export const VIEW_SEARCH_DATA = 'VIEW_SEARCH_DATA'

export const viewData = (props) => {
  debugger
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:4000/todos/')
        .then(response => {
          //console.log(response)

          dispatch(viewDataSuccess(response.data));
          resolve(true);


        }).catch(error => {
          //console.log(error)
          reject(true);
        })
    })
  }
}

export const viewSeachData = (obj) => {
  debugger
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:4000/todos/search', obj)
        .then(response => {
          //console.log(response)
          console.log(response.data)
          dispatch(viewSearchSuccess(response.data));
          resolve(true);


        }).catch(error => {
          //console.log(error)
          reject(true);
        })
    })
  }
}

export function viewDataSuccess(payload) {
  debugger
  return {
    type: VIEW_DATA_SUCCESS,
    viewDataDetails: payload
  }
}

export function searchChangeDescription(payload){
  return{
    type: SEARCH_CHANGE_DESCRIPTION,
    description: payload
  }
}

export function viewSearchSuccess(payload){
  return{
    type: VIEW_SEARCH_DATA,
    viewSearchDetails: payload
  }
}
export function searchStatus(status){
  return{
    type: SEARCH_STATUS,
    status: status
  }
}

export function displayStatus(status){
  return{
    type: DISPLAY_STATUS,
    status: status
  }
}


const ACTION_HANDLERS = {
  [VIEW_DATA_SUCCESS]: (state, action) => {
    return {
      ...state,
      todos: action.viewDataDetails
    }
  },
  [SEARCH_CHANGE_DESCRIPTION]: (state, action) => {
    return{
      ...state,
      todo_description: action.description
    }
  },

  [VIEW_SEARCH_DATA]: (state, action) => {
    return{
        ...state,
        todos: action.viewSearchDetails
    }
  },

  [SEARCH_STATUS]: (state, action) => {
    return{
      ...state,
      search: action.status
    }
  },

  [DISPLAY_STATUS]: (state, action) => {
    return{
      ...state,
      display: action.status
    }
  }
}

export default function todoReducer(state = initialState, action) {
  // console.log(state)
  console.log(action.type)
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}