import {SAVE_BOARD_SIZE} from '../constants';

export const saveBoardSize = (boardWidth,boardLength) => ({
  type   : SAVE_BOARD_SIZE,
  payload: {
    boardWidth,
    boardLength
  }
});