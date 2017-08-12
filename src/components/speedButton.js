import React, {
  Component
} from 'react';
import {connect} from 'react-redux';

import {changeSpeed} from '../AC/changeSpeed';
import {startGame} from '../AC/startGame';
import {putTimerIdIntoStorage} from '../AC/putTimerIdIntoStorage';
import {deleteTimer} from '../AC/deleteTimer';

import classNames from 'classnames';

class speedBtn extends Component {
  render() {
    const {text, generationSpeed, speedValue}=this.props;
    const btnClass = classNames({
      'btn': true,
      'speed-btn': true,
      'pushed-btn': speedValue===generationSpeed
    });
    return (
      <button className={btnClass} onClick={this.onClick}>{text}</button>
    )
  }

  onClick = (ev) => {
    const {changeSpeed, startGame, putTimerIdIntoStorage,deleteTimer,speedValue,isStarted}=this.props;
    ev.preventDefault();
    changeSpeed(speedValue);
    if (isStarted) {
      deleteTimer();
      let newTimerId = setInterval(startGame, speedValue);
      putTimerIdIntoStorage(newTimerId);
    }
  };
}

const mapStateToProps = state=> {
  return {
    generationSpeed: state.generation.get('generationSpeed'),
    isStarted            : !!state.timer.timerId,
  };
}

export default connect(mapStateToProps, {changeSpeed, putTimerIdIntoStorage, startGame, deleteTimer})(speedBtn);