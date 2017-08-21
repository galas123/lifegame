import {iteration} from './iteration';
import {putTimerIdIntoStorage} from './putTimerIdIntoStorage';

export const startGame = () => {
  return (dispatch, getState) => {
    const generationSpeed= getState().generation.get('generationSpeed');
    let timerId = setInterval(()=>dispatch(iteration()), generationSpeed);
    dispatch(putTimerIdIntoStorage(timerId));
  }
}

