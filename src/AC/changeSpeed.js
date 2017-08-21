import {CHANGE_SPEED} from '../constants';
import {deleteTimer} from './deleteTimer';
import {iteration} from './iteration';
import {putTimerIdIntoStorage} from './putTimerIdIntoStorage';


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
      dispatch (deleteTimer(false))
      let newTimerId = setInterval(()=>dispatch(iteration()), speedValue);
      dispatch (putTimerIdIntoStorage(newTimerId));
    }
  }
}
