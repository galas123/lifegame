import {SAVE_TIMERID} from '../constants';

export const saveTimerId = (timerId) => ({
  type   : SAVE_TIMERID,
  payload: timerId
});
