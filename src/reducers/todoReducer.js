import axios from "axios"
const initialState = {
  todos: [],
  todo_description: '',
  search: false,
  display: false,
  weather_status: false,
  id: '',
  page: 10,
  weather_data: '',
  temp: '',
  mars_img: '',
  mars_val: '',
  isActive: false
}

export const VIEW_DATA_SUCCESS = 'VIEW_DATA_SUCCESS'
export const SEARCH_CHANGE_DESCRIPTION = 'SEARCH_CHANGE_DESCRIPTION'
export const SEARCH_STATUS = 'SEARCH_STATUS'
export const DISPLAY_STATUS = 'DISPLAY_STATUS'
export const VIEW_SEARCH_DATA = 'VIEW_SEARCH_DATA'
export const VIEW_DELETE_DATA = 'VIEW_DELETE_DATA'
export const SET_TOTAL_PAGE = 'SET_TOTAL_PAGE'
export const VIEW_WEATHER_DATA = 'VIEW_WEATHER_DATA'
export const WEATHER_STATUS = 'WEATHER_STATUS'
export const GET_TEMP = 'GET_TEMP'
export const MARS_IMAGE = 'MARS_IMAGE'
export const MARS_IMAGE_CHANGE = 'MARS_IMAGE_CHANGE'
export const LOADER_STATE = 'LOADER_STATE'
export const MARS_IMAGE_CHANGE_VALNULL = 'MARS_IMAGE_CHANGE_VALNULL'

export const viewData = (page_obj) => {
  debugger
  console.log(page_obj)
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:4000/todos/todo', page_obj)
        .then(response => {
          //console.log(response.data)
          var p = Math.ceil((response.data.total / 6))
          //console.log(p)
          dispatch(setTotolPage(p))
          dispatch(viewDataSuccess(response.data.docs));
          dispatch(isActiveLoader(false))
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
          dispatch(isActiveLoader(false))
          resolve(true);


        }).catch(error => {
          //console.log(error)
          reject(true);
        })
    })
  }
}
export const onDelete = (payload) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:4000/todos/delete', payload)
        .then(response => {
          //console.log(response)
          console.log("ONDELETE")
          console.log(response.data)
          dispatch(viewDeleteData(response.data))
          dispatch(isActiveLoader(false))
          resolve(true);    

        }).catch(error => {
          //console.log(error)
          reject(true);
        })
    })
  }
}

export const fetchWeather = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + data.q + "&appid=" + data.appid)
        .then(response => {
          //console.log(response.data)
          dispatch(viewWeatherData(response.data))
          resolve(true);
        }).catch(error => {
          //console.log(error)
          reject(true);
        })
    })
  }
}

export const userAddData = (props) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:4000/todos/user/add', props)
        .then(response => {
          console.log(props)
          resolve(true);


        }).catch(error => {
          //console.log(error)
          reject(true);
        })
    })
  }
}


export const fetchMarsImage = (obj) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + obj.sol + "&api_key=" + obj.api_key)
        .then(response => {
          //console.log(response.data)
          
          dispatch(fetchMarsImageData(response.data))
          dispatch(isActiveLoader(false))
          dispatch(onMarsImageChangenull(''))
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

export function searchChangeDescription(payload) {
  return {
    type: SEARCH_CHANGE_DESCRIPTION,
    description: payload
  }
}

export function viewSearchSuccess(payload) {
  return {
    type: VIEW_SEARCH_DATA,
    viewSearchDetails: payload
  }
}
export function searchStatus(status) {
  return {
    type: SEARCH_STATUS,
    status: status
  }
}

export function displayStatus(status) {
  return {
    type: DISPLAY_STATUS,
    status: status
  }
}
export function weatherStatus(status) {
  return {
    type: WEATHER_STATUS,
    status: status
  }
}
export function viewDeleteData(payload) {
  return {
    type: VIEW_DELETE_DATA,
    viewDeleteDataDetails: payload
  }
}
export function setTotolPage(payload) {
  return {
    type: SET_TOTAL_PAGE,
    page: payload
  }
}
export function viewWeatherData(payload) {
  return {
    type: VIEW_WEATHER_DATA,
    viewWeatherDataDetails: payload
  }
}
export function getTemp(payload) {
  return {
    type: GET_TEMP,
    viewTemp: payload
  }
}
export function fetchMarsImageData(payload) {
  return {
    type: MARS_IMAGE,
    marsImage: payload
  }
}
export function onMarsImageChange(payload) {
  return {
    type: MARS_IMAGE_CHANGE,
    e: payload
  }
}
export function onMarsImageChangenull(payload){
  return{
    type: MARS_IMAGE_CHANGE_VALNULL,
    value: payload
  }
}
export function isActiveLoader(payload){
  return{
    type: LOADER_STATE,
    loadState: payload
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
    return {
      ...state,
      todo_description: action.description
    }
  },

  [VIEW_SEARCH_DATA]: (state, action) => {
    return {
      ...state,
      todos: action.viewSearchDetails
    }
  },

  [SEARCH_STATUS]: (state, action) => {
    return {
      ...state,
      search: action.status
    }
  },

  [DISPLAY_STATUS]: (state, action) => {
    return {
      ...state,
      display: action.status
    }
  },
  [WEATHER_STATUS]: (state, action) => {
    return {
      ...state,
      weather_status: action.status
    }
  },
  [VIEW_DELETE_DATA]: (state, action) => {
    return {
      ...state,
      todos: action.viewDeleteDataDetails
    }
  },
  [SET_TOTAL_PAGE]: (state, action) => {
    return {
      ...state,
      page: action.page
    }
  },
  [VIEW_WEATHER_DATA]: (state, action) => {
    return {
      ...state,
      weather_data: action.viewWeatherDataDetails
    }
  },

  [GET_TEMP]: (state, action) => {
    return {
      ...state,
      temp: action.viewTemp
    }
  },
  [MARS_IMAGE]: (state, action) => {
    return {
      ...state,
      mars_img: action.marsImage
    }
  },
  [MARS_IMAGE_CHANGE]: (state, action) => {
    debugger
    return{
      ...state,
      mars_val: action.e.target.value
    }
  },
  [MARS_IMAGE_CHANGE_VALNULL]: (state, action) => {
    return{
      ...state,
      mars_val: action.value
    }
  },
  [LOADER_STATE]: (state, action) => {
    return{
      ...state,
      isActive: action.loadState
    }
  }
}

export default function todoReducer(state = initialState, action) {
  // console.log(state)
  console.log(action.type)
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}