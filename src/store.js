import { createStore, combineReducers, applyMiddleware } from "redux"
import promise from "redux-promise-middleware"

// import editReducer from './reducers/editReducer'
import todoReducer from "./reducers/todoReducer";
import editReducer from './reducers/editReducer'
import thunk from "redux-thunk"
//export default createStore(todoReducer, applyMiddleware(thunk))
//export default applyMiddleware(thunk)(createStore)(todoReducer);

const reducer = combineReducers({
    todoReducer, editReducer
})
const store = createStore(reducer, applyMiddleware(thunk))
// export default createStore(
//     combineReducers({
//         editReducer, 
//         todoReducer}), 
//     applyMiddleware(thunk))

export default store