import React, { useState } from 'react';
import { Row, Col} from 'react-bootstrap';
import Cell from './Cell';
import beebot from "./BeeBot.png";
import singleBush from "../../images/maze-objects/single_bush.png";
import picnicBasket from "../../images/maze-objects/picnic_basket.png";
import pluralBushes from "../../images/maze-objects/plural_bushes.png";
import tree from "../../images/maze-objects/tree.png";
import bicycle from "../../images/maze-objects/bicycle.png";
export default function Board(props){

    const rows = 5;
    const columns = 6;

    const mazeMap = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            // check if the beebot is in the current position and displays in the current cell
            if (props.beebot && props.beebot.x === i && props.beebot.y === j) {
                row.push(
                    <Col lg={2} md={2} sm={2} className="p-0">
                    <Cell
                        key={`${i}-${j}`}
                        image={beebot}
                        row={i}
                        col={j}
                        orientation={props.beebot.o}
                    /></Col>
                    ); 
            } else {
                if (props.getCurrState(i,j) === 1) {
                    row.push(
                        <Col lg={2} md={2} sm={2} className="p-0">
                        <Cell
                            key={`${i}-${j}`}
                            image={singleBush}
                            row={i}
                            col={j}
                            orientation={'n'}
                        /></Col>
                    ); 
                } else if (props.getCurrState(i,j) === 3) {
                    row.push(
                        <Col lg={2} md={2} sm={2} className="p-0">
                        <Cell
                            key={`${i}-${j}`}
                            image={picnicBasket}
                            row={i}
                            col={j}
                            orientation={'n'}
                        /></Col>
                    ); 
                }else if (props.getCurrState(i,j) === 4) {
                    row.push(
                        <Col lg={2} md={2} sm={2} className="p-0">
                        <Cell
                            key={`${i}-${j}`}
                            image={pluralBushes}
                            row={i}
                            col={j}
                            orientation={'n'}
                        /></Col>
                    ); 
                } else if (props.getCurrState(i,j) === 5) {
                    row.push(
                        <Col lg={2} md={2} sm={2} className="p-0">
                        <Cell
                            key={`${i}-${j}`}
                            image={bicycle}
                            row={i}
                            col={j}
                            orientation={'n'}
                        /></Col>
                    ); 
                }else if (props.getCurrState(i,j) === 6) {
                    row.push(
                        <Col lg={2} md={2} sm={2} className="p-0">
                        <Cell
                            key={`${i}-${j}`}
                            image={tree}
                            row={i}
                            col={j}
                            orientation={'n'}
                        /></Col>
                    ); 
                }else {
                    row.push(
                        <Col lg={2} md={2} sm={2} className="p-0">
                            <Cell
                                key={`${i}-${j}`}
                                image={null}
                                row={i}
                                col={j}
                        /></Col>
                    );    
                }
            }
        }
        mazeMap.push(<Row >{row}</Row>);
    }

    

    return (
        <div className="board">
            {mazeMap}
        </div>
    );
}