import {SAVE_TIMERID} from '../constants';

export const putTimerIdIntoStorage = (timerId) => ({
  type   : SAVE_TIMERID,
  payload: timerId
})
