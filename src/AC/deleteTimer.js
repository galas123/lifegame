import {DELETE_TIMER} from '../constants';
import {startGame} from '../AC/startGame';

export const deleteTimer = (clearFlag) => {
  return (dispatch, getState) => {
    const state     = getState().timer;
    const isStarted = !!state.timerId;
    const generationSpeed=getState().generation.get('generationSpeed');
    if (clearFlag || isStarted) {
      dispatch({
        type   : DELETE_TIMER,
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
