import {DEAD, ALIVE, NEWBORN} from '../constants';
import React, {
  Component
} from 'react';

import {connect} from 'react-redux';

import {changeCellValue} from '../AC/changeCellValue';

import classNames from 'classnames';

class Cell extends Component {
  render() {
    const {value}=this.props;
    const btnClass = classNames({
      'btn-cell'   : true,
      'btn-cell--alive'  : value === ALIVE,
      'btn-cell--newborn': value === NEWBORN,
      'btn-cell--died'   : value === DEAD
    });
    return (
      <div className={btnClass} onClick={this.onClick}/>
    );
  }

  onClick = (ev) => {
    const {changeCellValue, lineIndex, rowIndex}=this.props;
    ev.preventDefault();
    changeCellValue(lineIndex, rowIndex);

  };
}

export default connect(null, {changeCellValue})(Cell);