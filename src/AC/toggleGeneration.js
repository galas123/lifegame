import {CLEAR_BOARD} from '../constants';
import {startGame} from '../AC/startGame';

export const toggleGeneration = (clearFlag) => {
  return (dispatch, getState) => {
    const state     = getState().timer;
    const isStarted = !!state.timerId;
    if (clearFlag || isStarted) {
      dispatch({
        type   : CLEAR_BOARD,
        payload: {
          clearFlag
        }
      });
    }
    else {
      dispatch(startGame());
    }
  }
};
