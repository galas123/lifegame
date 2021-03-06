import React, {
  Component
} from 'react';
import {connect} from 'react-redux';

import {startGame} from '../AC/startGame';

class StartBtn extends Component {
  render() {
    return (
      <button type="button" className="btn start-btn" onClick={this.onClick}>Start</button>
    )
  }

  onClick = (ev) => {
    const {startGame}=this.props;
    ev.preventDefault();
    startGame();
  };
}

export default connect(null, {startGame})(StartBtn);