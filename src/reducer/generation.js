import {START_GENERATION, NEXT_GENERATION, PAUSED_GENERATION, CLEAR_BOARD} from '../constants';

import {Map, List}  from 'immutable';

const defaultState = Map({
  generations: List(
    List(["dead", "alive", "alive", "dead", "newborn", "dead"]),
    List(["dead", "alive", "alive", "dead", "newborn", "dead"]),
    List(["dead", "alive", "alive", "dead", "newborn", "dead"]),
    List(["dead", "alive", "alive", "dead", "newborn", "dead"]),
    List(["dead", "alive", "alive", "dead", "newborn", "dead"]),
    List(["dead", "alive", "alive", "dead", "newborn", "dead"])
  ),
  iteration:0,
  
});

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
  }
  }