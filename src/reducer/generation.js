import {
  ITERATION,
  DEAD,
  ALIVE,
  NEWBORN,
  CLEAR_BOARD,
  CHANGE_CELL_VALUE,
  CHANGE_SPEED,
  SAVE_BOARD_SIZE,
  SMALL_BOARD,
  MEDIUM
} from '../constants';

import {exampleBoard} from '../exampleBoard';

import {Map, List}  from 'immutable';

const defaultState = Map({
  boardSize      : SMALL_BOARD,
  generationSpeed: MEDIUM,
  population    : exampleBoard,
  iteration      : 0
});
export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case  SAVE_BOARD_SIZE:
      return state.set('boardSize', payload.lable);
    case CHANGE_SPEED:
      return state.set('generationSpeed', payload.speedValue);
    case CHANGE_CELL_VALUE:
      const {lineIndex, rowIndex} = payload;
      const newValue = (state.getIn(['population', lineIndex, rowIndex]) == DEAD) ? NEWBORN : DEAD;
      return state.setIn(['population', lineIndex, rowIndex], newValue);
    case CLEAR_BOARD:
      const size  = state.get('boardSize');
      if (payload.clearFlag) return state.set('population', generatorDeadBoard(size.width, size.height)).set('iteration', 0);
      break;
    case ITERATION:
      const oldPopulation = state.get('population');
      let newPopulation   = oldPopulation.slice(0);

      oldPopulation.forEach(
        (oldPopulationLine, lineIndex)=> {
          let prevLineIndex;
          let nextLineIndex;
          switch (lineIndex) {
            case 0:
              prevLineIndex = oldPopulation.size - 1;
              nextLineIndex = lineIndex + 1;
              break;
            case oldPopulation.size - 1:
              nextLineIndex = 0;
              prevLineIndex = lineIndex - 1;
              break;
            default:
              prevLineIndex = lineIndex - 1;
              nextLineIndex = lineIndex + 1;
              break;
          }
          oldPopulationLine.forEach((unit, index)=> {
            let neighboursArray = [];
            let prevIndex;
            let nextIndex;
            switch (index) {
              case 0:
                prevIndex = oldPopulationLine.size - 1;
                nextIndex = index + 1;
                break;
              case oldPopulationLine.size - 1:
                nextIndex = 0;
                prevIndex = index - 1;
                break;
              default:
                prevIndex = index - 1;
                nextIndex = index + 1;
                break;
            }

            let prevLine = state.getIn(['population', prevLineIndex]);
            neighboursArray.push(prevLine.get(prevIndex));
            neighboursArray.push(prevLine.get(index));
            neighboursArray.push(prevLine.get(nextIndex));

            neighboursArray.push(oldPopulationLine.get(prevIndex));
            neighboursArray.push(oldPopulationLine.get(nextIndex));


            let nextLine = state.getIn(['population', nextLineIndex]);
            neighboursArray.push(nextLine.get(prevIndex));
            neighboursArray.push(nextLine.get(index));
            neighboursArray.push(nextLine.get(nextIndex));


            let notDeadNeighbours = neighboursArray.reduce((sum, item)=> {
              if (item !== DEAD) {
                return sum + 1;
              }
              return sum
            }, 0);

            if (unit !== DEAD && (notDeadNeighbours <= 1 || notDeadNeighbours > 3)) {
              newPopulation = newPopulation.setIn([lineIndex, index], DEAD);
            }
            if (unit === NEWBORN && (notDeadNeighbours === 2 || notDeadNeighbours === 3)) {
              newPopulation = newPopulation.setIn([lineIndex, index], ALIVE);
            }
            if (unit === DEAD && notDeadNeighbours === 3) {
              newPopulation = newPopulation.setIn([lineIndex, index], NEWBORN);
            }
          })
        }
      )
      const counter = state.get('iteration') + 1;
      return state.set('population', newPopulation).set('iteration', counter);
  }
  return state;
}

const generatorDeadBoard = (n, m)=> {
  const board = [];
  for (let i = 0; i < n; i++) {
    let newLine = Array(m).fill(DEAD);
    board.push(List(newLine));
  }
  return List(board);
};
