import React, { useState, useEffect } from 'react';
import Board from "./components/Board";
import './Game.css'

function Game() {

    const [map, setMap] = useState([
        [1, 1, 1, 2, 2, 3],
        [1, 1, 1, 2, 1, 1],
        [1, 1, 2, 2, 1, 1],
        [2, 2, 2, 1, 1, 1],
    ]);

 
    return (
        <div className="game-background">

            <Board cells={map}></Board>
            <div className='button-container'>
                <div className='button-wrapper'>
                <button className='black-button'>{'<-'}</button>
                <button className='black-button'>up</button>
                <button className='black-button'>{'->'}</button>
                <button className='green-button'>GO</button>
                </div>
            </div>
        </div>
    );
}

export default Game;