import React, {
  Component
} from 'react';
import {connect} from 'react-redux';
import Line from './line';

 class board extends Component {
  render() {
    const {population}=this.props;
    const board=population.map((line,index)=>
    <Line populationLine={line} key={index} lineIndex={index}/>
      );
    return (
      <div className="life-game-board">
    {board}
        </div>
    );
  }
}
const mapStateToProps = state=> {
  console.log(state);
  return {
    population: state.generation.get('generations')
  };
}

export default connect(mapStateToProps,null)(board);