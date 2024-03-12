import React, { useState } from 'react';
import Cell from './Cell';

export default function Board(props){
    const rows = 4;
    const columns = 6;

    return (
        <div className='board-container'>
        <div className="board">
            {[...Array(rows)].map((_, rowIndex) => (
                <div key={rowIndex}>
                    {[...Array(columns)].map((_, colIndex) => {
                        const index = rowIndex * columns + colIndex;
                        return (
                            <Cell
                                key={index}
                                value={props.cells[index]}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
        </div>
    );
}