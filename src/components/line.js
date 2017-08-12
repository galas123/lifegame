import React, {
  Component
} from 'react';
import Cell from './cell';

export default class line extends Component {
  render() {
    const {populationLine, lineIndex}=this.props;
    const line=populationLine.map((cell,index)=>
      <Cell value={cell} key={index} rowIndex={index} lineIndex={lineIndex}/>
    );
    return (
      <div className="board-line">
    {line}
        </div>
    );
  }
}
