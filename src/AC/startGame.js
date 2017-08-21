import {iteration} from './iteration';
import {saveTimerId} from './saveTimerId';

export const startGame = () => {
  return (dispatch, getState) => {
    const generationSpeed= getState().generation.get('generationSpeed');
    let timerId = setInterval(()=>dispatch(iteration()), generationSpeed);
    dispatch(saveTimerId(timerId));
  }
};

