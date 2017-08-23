import {CHANGE_SPEED} from '../constants';
import {toggleGeneration} from './toggleGeneration'
import {startGame} from './startGame';


export const changeSpeed = (speedValue) => {
  return (dispatch, getState) => {
    const state     = getState().timer;
    const isStarted = !!state.timerId;
    dispatch({
      type   : CHANGE_SPEED,
      payload: {
        speedValue
      }
    });

    if (isStarted) {
      dispatch (toggleGeneration(false));
      dispatch(startGame());
    }
  }
};
