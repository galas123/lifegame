import {SAVE_SIZE} from '../constants';

export const saveBoardSize = (boardWidth,boardLength) => ({
  type   : SAVE_SIZE,
  payload: {
    boardWidth,
    boardLength
  }
})