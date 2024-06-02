import React, { useState } from 'react';
import Cell from './Cell';
import beebot from "./BeeBot.png";
export default function Board(props){

    const rows = 5;
    const columns = 6;

    const mazeMap = [];
    for (let j = 0; j < columns; j++) {
        let col = [];
        for (let i = 0; i < rows; i++) {
            if (props.beebot && props.beebot.x === i && props.beebot.y === j) {
                col.push(
                    <Cell
                        key={`${j}-${i}`}
                        image={beebot}
                        row={i}
                        col={j}
                        orientation={props.beebot.o}
                    />
                    ); 
            } else {
                col.push(
                    <Cell
                        key={`${j}-${i}`}
                        image={null}
                        row={i}
                        col={j}
                    />
                ); 
            }
        }
        mazeMap.push(<div key={j}>{col}</div>);
    }

    

    return (
        <div className='board-container'>
        <div className="board">
            {mazeMap}
        </div>
        </div>
    );
}