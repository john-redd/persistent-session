import { createStore, combineReducers } from 'redux'
import userReducer from './reducers/user.js'

const rootReducer = combineReducers({
  userReducer
})

export default createStore(rootReducer)
