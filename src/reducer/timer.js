import {CLEAR_BOARD, SAVE_TIMERID} from '../constants';

const defaultState = {
  timerId:null
};

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SAVE_TIMERID:
      return {timerId:payload};

    case CLEAR_BOARD:
      clearInterval(state.timerId);
      return {timerId:null};

    default: return state;
  }
  return state;
}