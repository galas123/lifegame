import {DELETE_TIMER} from '../constants';

export const deleteTimer = (cleaning) => ({
  type   : DELETE_TIMER,
  payload: cleaning
})