import {DELETE_TIMER, SAVE_TIMERID} from '../constants';

const defaultState = {
  timerId:null
};

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SAVE_TIMERID:
      return {timerId:payload};

    case DELETE_TIMER:
      clearInterval(state.timerId);
      return {timerId:null};

    default: return state;
  }
  return state;
}