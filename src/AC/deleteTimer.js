import {DELETE_TIMER} from '../constants';
import {iteration} from '../AC/iteration';
import {putTimerIdIntoStorage} from '../AC/putTimerIdIntoStorage';


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
      let timerId = setInterval(()=>dispatch(iteration()), generationSpeed);
      dispatch (putTimerIdIntoStorage(timerId));
    }
  }
}
