import React, {
  Component
} from 'react';
import {connect} from 'react-redux';

import {deleteTimer} from '../AC/deleteTimer';
import {saveBoardSize} from '../AC/saveBoardSize';

import classNames from 'classnames';

class changeSizeButton extends Component {

  render() {
    const {text,boardSize, boardWidth, boardLength}=this.props;
    const btnClass = classNames({
      'btn': true,
      'size-btn': true,
      'pushed-btn': Number(boardSize.get(0))===Number(boardWidth) && Number(boardSize.get(1))===Number(boardLength)
    });
    return (
      <button className={btnClass} onClick={this.onClick}>{text}</button>
    )
  }

  onClick = (ev) => {
    const {deleteTimer, saveBoardSize, boardWidth, boardLength}=this.props;
    ev.preventDefault();
    saveBoardSize(boardWidth,boardLength);
    deleteTimer(true);

  };
}
const mapStateToProps = state=>({
  boardSize: state.generation.get('boardSize')
});

export default connect(mapStateToProps, {saveBoardSize, deleteTimer})(changeSizeButton);