import './GameBoard.css'
import React, { useState } from 'react';


export default function Cell(props){

    let image = props.image;

    if (!image) {
        return (
            <div className="cell"></div>
          );
    }

    let orientation = props.orientation || 'e';

    return(
    <div className="cell">
        <div>
            <img src={image}
            alt='beebot'
            height={100}
            width={100}
            style={{
                marginLeft: '8px',
                alignSelf: 'center',
                transform: `rotate(${orientation === 'n' ? 0 : orientation === 'e' ? 90 : orientation === 's' ? 180 : 270}deg)`
            }}
            ></img>
        </div>
    </div>
    );
}