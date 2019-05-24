import axios from "axios"
const initialState = {
  todos: [],
  todo_description: ''
}

export const VIEW_DATA_SUCCESS = 'VIEW_DATA_SUCCESS'
export const SEARCH_CHANGE_DESCRIPTION = 'SEARCH_CHANGE_DESCRIPTION'

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
  }

}

export default function todoReducer(state = initialState, action) {
  // console.log(state)
  console.log(action.type)
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}