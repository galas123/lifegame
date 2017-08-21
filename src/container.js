import {FAST, MEDIUM, SLOW} from './constants';
import React, {Component} from 'react';
import './App.css';
import Board from './components/board';
import StartBtn from './components/startBtn';
import StopBtn from './components/stopBtn';
import GenerationNumber from './components/generationNumber';
import SpeedButton from './components/speedButton';
import ChangeSizeButton from './components/changeSizeButton';

export default class Container extends Component {

  render() {
    return (
      <div className="life-game">
        <h1 className="life-game_caption">Game Of Life</h1>
        <div className="wrapper">
          <div className="controls-frame">
            <StartBtn/>
            <StopBtn text="Pause"/>
            <StopBtn text="Clear" clearFlag/>
            <div className="generation-number">
              <h3>Generation:</h3>
              <GenerationNumber/>
            </div>
          </div>
          <div>
            <Board classname={"life-game-board"}/>
            <div className="board-size-controls">
              <h3 className="board-size_capture"> Board size</h3>
              <ChangeSizeButton text="12X12" boardLength='12' boardWidth='12'/>
              <ChangeSizeButton text="25X35" boardLength='35' boardWidth='25'/>
              <ChangeSizeButton text="40X50" boardLength='50' boardWidth='40'/>
            </div>
          </div>

          <div className="speed-block">
            <h3 className="speed-block_capture">Speed</h3>
            <div className="speed-buttons">
              <SpeedButton text="slow" speedValue={SLOW}/>
              <SpeedButton text="medium" speedValue={MEDIUM}/>
              <SpeedButton text="fast" speedValue={FAST}/>
            </div>
          </div>


        </div>
      </div>
    );
  }
}


