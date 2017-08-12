import React, {
  Component
} from 'react';
import {connect} from 'react-redux';

import {deleteTimer} from '../AC/deleteTimer';
import {startGame} from '../AC/startGame';
import {putTimerIdIntoStorage} from '../AC/putTimerIdIntoStorage';

import classNames from 'classnames';

class stopBtn extends Component {
  render() {
    const {text, isStarted, cleaning}=this.props;
    const btnClass = classNames({
      'btn': true,
      'clear-btn': true,
      'pushed-btn': !isStarted && !cleaning
    });
    return (
      <button className={btnClass} onClick={this.onClick}>{text}</button>
    )
  }

  onClick = (ev) => {
    const {deleteTimer, cleaning, isStarted, startGame, putTimerIdIntoStorage,generationSpeed}=this.props;
    ev.preventDefault();
    if (cleaning || isStarted) deleteTimer(cleaning);
      else {
        let timerId = setInterval(startGame, generationSpeed);
        putTimerIdIntoStorage(timerId);
    }
  }
}

const mapStateToProps = state=>({
  isStarted            : !!state.timer.timerId,
  generationSpeed: state.generation.get('generationSpeed')
});

export default connect(mapStateToProps, {deleteTimer, startGame, putTimerIdIntoStorage})(stopBtn);