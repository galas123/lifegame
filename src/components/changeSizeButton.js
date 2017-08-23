import React, {
  Component
} from 'react';
import {connect} from 'react-redux';

import {toggleGeneration} from '../AC/toggleGeneration';
import {saveBoardSize} from '../AC/saveBoardSize';

import classNames from 'classnames';

class ChangeSizeButton extends Component {

  render() {
    const {text,boardSize, lable}=this.props;
    const btnClass = classNames({
      'btn': true,
      'size-btn': true,
      'pushed-btn': boardSize===lable
    });
    return (
      <button type="button" className={btnClass} onClick={this.onClick}>{text}</button>
    )
  }

  onClick = (ev) => {
    const {toggleGeneration, saveBoardSize, lable}=this.props;
    ev.preventDefault();
    saveBoardSize(lable);
    toggleGeneration(true);
  };
}
const mapStateToProps = state=>({
  boardSize: state.generation.get('boardSize')
});

export default connect(mapStateToProps, {saveBoardSize, toggleGeneration})(ChangeSizeButton);