import React, {
  Component
} from 'react';
import {connect} from 'react-redux';

import {startGame} from '../AC/startGame';
import {putTimerIdIntoStorage} from '../AC/putTimerIdIntoStorage';

class startBtn extends Component {
  render() {
    return (
      <button className="btn start-btn" onClick={this.onClick}>Start</button>
    )
  }

  onClick = (ev) => {
    const {startGame, putTimerIdIntoStorage, generationSpeed}=this.props;
    ev.preventDefault();
    let timerId=setInterval(startGame, generationSpeed);
    putTimerIdIntoStorage(timerId);

  };
}

const mapStateToProps = state=> {
  return {
    generationSpeed: state.generation.get('generationSpeed')
  };
}
export default connect(mapStateToProps, {startGame, putTimerIdIntoStorage})(startBtn);