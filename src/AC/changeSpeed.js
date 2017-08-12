import {CHANGE_SPEED} from '../constants';

export const changeSpeed = (speedValue) => ({
  type   : CHANGE_SPEED,
  payload:{
    speedValue
  }
})
