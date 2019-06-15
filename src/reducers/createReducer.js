import axios from "axios"
const initialState = {
  todo_description: '',
  todo_responsible: '',
  todo_priority: '',
  todo_completed: false
}

const ON_CHANGE_DESCRIPTION = 'ON_CHANGE_DESCRIPTION'
const ON_CHANGE_RESPONSIBLE = 'ON_CHANGE_RESPONSIBLE'
const ON_CHANGE_PRIORITY = 'ON_CHANGE_PRIORITY'
const ON_CHANGE_COMPLETED = 'ON_CHANGE_COMPLETED'

export const createData = (obj) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:4000/todos/add', obj)
        .then(response => {
          resolve(true)
        }).catch(error => {
          //console.log(error)
          reject(true);
        })
    })
  }
}

export function onChangeTodoDescription(payload) {
  return {
    type: ON_CHANGE_DESCRIPTION,
    e: payload
  }
}
export function onChangeTodoResponsible(payload) {
  return {
    type: ON_CHANGE_RESPONSIBLE,
    e: payload
  }
}
export function onChangeTodoPriority(payload) {
  return {
    type: ON_CHANGE_PRIORITY,
    e: payload
  }
}
export function onChangeTodoCompleted(payload) {
  return {
    type: ON_CHANGE_COMPLETED,
    e: payload
  }
}
const ACTION_HANDLERS = {

  [ON_CHANGE_DESCRIPTION]: (state, action) => {
    return {
      ...state,
      todo_description: action.e.target.value
    }
  },
  [ON_CHANGE_RESPONSIBLE]: (state, action) => {
    return {
      ...state,
      todo_responsible: action.e.target.value
    }
  },
  [ON_CHANGE_PRIORITY]: (state, action) => {
    return {
      ...state,
      todo_priority: action.e.target.value
    }
  },
  [ON_CHANGE_COMPLETED]: (state, action) => {
    console.log(action.e)
    debugger
    return {
      ...state,
      todo_completed: action.e.target.value
    }
  }

}





export default function createReducer(state = initialState, action) {
  // console.log(state)
  console.log(action.type)
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}