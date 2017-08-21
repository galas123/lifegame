import {
  ITERATION,
  DEAD,
  ALIVE,
  NEWBORN,
  DELETE_TIMER,
  CHANGE_CELL_VALUE,
  CHANGE_SPEED,
  SAVE_SIZE
} from '../constants';

import {Map, List}  from 'immutable';

const defaultState = Map({
  boardSize      : List([12, 12]),
  generationSpeed: 500,
  generations    : List([
      List([DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD]),
      List([DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD]),
      List([DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD]),
      List([DEAD, DEAD, ALIVE, ALIVE, ALIVE, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD]),
      List([DEAD, DEAD, NEWBORN, DEAD, ALIVE, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD]),
      List([DEAD, DEAD, ALIVE, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD]),
      List([DEAD, DEAD, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, DEAD]),
      List([DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD]),
      List([DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD]),
      List([DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD]),
      List([DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD]),
      List([DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD, DEAD])
    ]
  ),
  iteration      : 0
});
export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case  SAVE_SIZE:
      return state.setIn(['boardSize', 0], payload.boardWidth).setIn(['boardSize', 1], payload.boardLength);
    case CHANGE_SPEED:
      return state.set('generationSpeed', payload.speedValue);
      break;
    case CHANGE_CELL_VALUE:
      const lineIndex = payload.lineIndex;
      const rowIndex  = payload.rowIndex;
      const newValue  = (state.getIn(['generations', lineIndex, rowIndex]) == DEAD) ? NEWBORN : DEAD;
      return state.setIn(['generations', lineIndex, rowIndex], newValue);
      break;
    case DELETE_TIMER:
      const width  = state.getIn(['boardSize', 0]);
      const length = state.getIn(['boardSize', 1]);
      if (payload.clearFlag) return state.set('generations', generatorDeadBoard(width, length)).set('iteration', 0);
      break;
    case ITERATION:
      const oldPopulation = state.get('generations');
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

            let prevLine = state.getIn(['generations', prevLineIndex]);
            neighboursArray.push(prevLine.get(prevIndex));
            neighboursArray.push(prevLine.get(index));
            neighboursArray.push(prevLine.get(nextIndex));

            neighboursArray.push(oldPopulationLine.get(prevIndex));
            neighboursArray.push(oldPopulationLine.get(nextIndex));


            let nextLine = state.getIn(['generations', nextLineIndex]);
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
      return state.set('generations', newPopulation).set('iteration', counter);
  }
  return state;
}

const generatorDeadBoard = (n, m)=> {
  const board = [];
  for (let i = 0; i < n; i++) {
    let newLine = [];
    for (let j = 0; j < m; j++) {
      newLine.push(DEAD);
    }
    board.push(List(newLine));
  }
  return List(board);
};
