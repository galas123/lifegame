import {CHANGE_CELL_VALUE} from '../constants';

export const changeCellValue = (lineIndex, rowIndex) => ({
  type   : CHANGE_CELL_VALUE,
  payload:{
    lineIndex,
    rowIndex
  }
})