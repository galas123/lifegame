import { combineReducers } from 'redux'
import generation from './generation'
import timer from './timer'

export default combineReducers({
  generation, timer
})