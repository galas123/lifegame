import React, {
  Component
} from 'react';
import {connect} from 'react-redux';

import {changeSpeed} from '../AC/changeSpeed';
import {iteration} from '../AC/iteration';
import {saveTimerId} from '../AC/saveTimerId';
import {toggleGeneration} from '../AC/toggleGeneration';

import classNames from 'classnames';

class SpeedBtn extends Component {
  render() {
    const {text, generationSpeed, speedValue}=this.props;
    const btnClass = classNames({
      'btn': true,
      'speed-btn': true,
      'pushed-btn': speedValue===generationSpeed
    });
    return (
      <button type="button" className={btnClass} onClick={this.onClick}>{text}</button>
    )
  }

  onClick = (ev) => {
    const {changeSpeed, speedValue}=this.props;
    ev.preventDefault();
    changeSpeed(speedValue);
  };
}

const mapStateToProps = state=> {
  return {
    generationSpeed: state.generation.get('generationSpeed'),
  };
}

export default connect(mapStateToProps, {changeSpeed, saveTimerId, iteration, toggleGeneration})(SpeedBtn);