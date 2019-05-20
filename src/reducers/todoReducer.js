import axios from "axios"
const initialState = {
  todos: []
}

export const VIEW_DATA_SUCCESS = 'VIEW_DATA_SUCCESS'


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

const ACTION_HANDLERS = {
  [VIEW_DATA_SUCCESS]: (state, action) => {
    return {
      ...state,
      todos: action.viewDataDetails
    }
  }

}

export default function todoReducer(state = initialState, action) {
  // console.log(state)
  console.log(action.type)
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}