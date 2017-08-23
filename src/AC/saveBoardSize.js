import {SAVE_BOARD_SIZE} from '../constants';

export const saveBoardSize = (lable) => ({
  type   : SAVE_BOARD_SIZE,
  payload: {
    lable
  }
});