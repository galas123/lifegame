import React, {
  Component
} from 'react';
import {connect} from 'react-redux';

import {deleteTimer} from '../AC/deleteTimer';

import classNames from 'classnames';

class stopBtn extends Component {
  render() {
    const {text, isStarted, clearFlag}=this.props;
    const btnClass = classNames({
      'btn': true,
      'clear-btn': true,
      'pushed-btn': !isStarted && !clearFlag
    });
    return (
      <button className={btnClass} onClick={this.onClick}>{text}</button>
    )
  }

  onClick = (ev) => {
    const {deleteTimer, clearFlag}=this.props;
    ev.preventDefault();
    deleteTimer(clearFlag);
  }
}

export default connect(null, {deleteTimer})(stopBtn);