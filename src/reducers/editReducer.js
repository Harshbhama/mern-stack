import axios from "axios"

const initialState = {
  todo_description: '',
  todo_responsible: '',
  todo_priority: '',
  todo_completed: false
}


const VIEW_DATA_CHANGE_SUCCESS = 'VIEW_DATA_CHANGE_SUCCESS'
const ON_CHANGE_TODO_DESCRIPTION = 'ON_CHANGE_TODO_DESCRIPTION'
const ON_CHANGE_TODO_RESPONSIBLE = 'ON_CHANGE_TODO_RESPONSIBLE'
const ON_CHANGE_TODO_PRIORITY = 'ON_CHANGE_TODO_PRIORITY'
const ON_CHANGE_TODO_COMPLETED = 'ON_CHANGE_TODO_COMPLETED'

export const viewDataChange = (props) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:4000/todos/' + props.match.params.id)
        .then(response => {
          dispatch(viewDataChangeSuccess(response.data));
          resolve(true)
        }).catch(error => {
          //console.log(error)
          reject(true);
        })
    })
  }
}

export const viewDataUpdate = (props, obj) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:4000/todos/update/' + props.match.params.id, obj)
        .then(response => {
          resolve(true)
        }).catch(error => {
          reject(true);
        })
    })
  }
}

export function viewDataChangeSuccess(payload) {
  return {
    type: VIEW_DATA_CHANGE_SUCCESS,
    viewDataChangeDetails: payload
  }
}

export function onChangeTodoDescription(e) {
  return {
    type: ON_CHANGE_TODO_DESCRIPTION,
    e: e
  }
}

export function onChangeTodoResponsible(e) {
  // console.log(e.target.value)
  return {
    type: ON_CHANGE_TODO_RESPONSIBLE,
    e: e
  }
}

export function onChangeTodoPriority(e) {
  return {
    type: ON_CHANGE_TODO_PRIORITY,
    e: e
  }
}

export function onChangeTodoCompleted(e) {
  console.log(e)
  return {
    type: ON_CHANGE_TODO_COMPLETED,
    e: e
  }
}

const ACTION_HANDLERS = {
  [VIEW_DATA_CHANGE_SUCCESS]: (state, action) => {
    return {
      ...state,
      todo_description: action.viewDataChangeDetails.todo_description,
      todo_responsible: action.viewDataChangeDetails.todo_responsible,
      todo_priority: action.viewDataChangeDetails.todo_priority,
      todo_completed: action.viewDataChangeDetails.todo_completed
    }
  },
  [ON_CHANGE_TODO_DESCRIPTION]: (state, action) => {
    return {
      ...state,
      todo_description: action.e.target.value
    }
  },

  [ON_CHANGE_TODO_RESPONSIBLE]: (state, action) => {
    //console.log(action.e.target)
    return {
      ...state,
      todo_responsible: action.e.target.value
    }
  },

  [ON_CHANGE_TODO_PRIORITY]: (state, action) => {
    return {
      ...state,
      todo_priority: action.e.target.value
    }
  },
  [ON_CHANGE_TODO_COMPLETED]: (state, action) => {
    console.log(action.e.target)
    console.log(action.e)
    return {
      ...state,
      todo_completed: !initialState.todo_completed
    }
  }

  // [ON_CHANGE_TODO_COMPLETED]: (state, action) => {
  //   return{
  //     ...state,
  //     todo_completed: 
  //   }
  // }
}


export default function editReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}



