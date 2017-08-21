import React, {Component} from 'react';

import {connect} from 'react-redux';

class generationNumber extends Component {
  render() {
    const {iteration}=this.props;
    return (
      <span>{iteration}</span>
    );
  }
}

  const mapStateToProps = state=>({
    iteration            : state.generation.get('iteration')
  });

  export default connect(mapStateToProps, null)(generationNumber);