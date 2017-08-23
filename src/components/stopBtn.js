import React, {
  Component
} from 'react';
import {connect} from 'react-redux';

import {toggleGeneration} from '../AC/toggleGeneration';

import classNames from 'classnames';

class StopBtn extends Component {
  render() {
    const {text, isStarted, clearFlag}=this.props;
    const btnClass = classNames({
      'btn': true,
      'clear-btn': true,
      'pushed-btn': !isStarted && !clearFlag
    });
    return (
      <button type="button" className={btnClass} onClick={this.onClick}>{text}</button>
    )
  }

  onClick = (ev) => {
    const {toggleGeneration, clearFlag}=this.props;
    ev.preventDefault();
    toggleGeneration(clearFlag);
  }
}

export default connect(null, {toggleGeneration})(StopBtn);