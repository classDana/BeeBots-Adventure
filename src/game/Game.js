import React, { useState, useEffect } from 'react';
import Board from "./components/Board";
import Message from "./components/Message";
import BeeBotFigure from "../images/BeeBot_figure.png";
import { Row, Col, Container} from 'react-bootstrap';
import left from "../images/buttons/leftButton.png";
import forward from "../images/buttons/forwardButton.png";
import right from "../images/buttons/rightButton.png";
import jsonData from "./game_assets/beebot_phrases.json";
import './Game.css'

/*
    @Title: BeeBots Adventure
    @Name: Daniela Milisic
    @Date: xx.xx.xxxx
    
*/

function Game() {

    const stepsArr = new Array();
    const beebotInteraction = jsonData.phrases;
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState('e');
    const [beebot, setBeebot] = useState({ x: 4, y: 0, o: 'e' });
    const [gameOver, setGameOver] = useState(false);
    const [finishedGame, setFinishedGame] = useState(false);

    /*
    The game contains 3 levels from easy to hard.
    The list of maps contains two variables:
        1: This field leads to a dead end.
        2: This field leads to the goal.
        3: This field is the goal.
    */

    const [map, setMap] = useState(
    [
        [5, 2, 2, 0, 0, 1],
        [2, 4, 2, 0, 2, 2],
        [3, 2, 0, 0, 2, 5],
        [2, 5, 0, 3, 2, 3],
        [0, 0, 0, 2, 3, 4],
    ],
    [
        [1, 1, 1, 2, 2, 2],
        [1, 1, 1, 2, 1, 1],
        [1, 1, 2, 2, 1, 1],
        [2, 2, 2, 1, 1, 1],
    ],
    [
        [1, 1, 1, 2, 2, 2],
        [1, 1, 1, 2, 1, 1],
        [1, 1, 2, 2, 1, 1],
        [2, 2, 2, 1, 1, 1],
    ]);

    /*
    Each map has its own start coordinates.
    The BeeBot is placed at the
    start of the game at the starting
    coordinates of the respective map
    */

    var startCoords = [
        { x: 5, y: 4, o: "e"},
        { x: 2, y: 7, o: "e"},
        { x: 8, y: 3, o: "e" },
    ];

    /*
    Each map has its own end coordinates.
    If the BeeBot is placed at the 
    end coordinates then the game 
    is finished.
    */

    var endCoordinate = { x: 0, y: 5 };
    var endCoords = [
        { x: 5, y: 4 },
        { x: 2, y: 7 },
        { x: 8, y: 3 },
    ];

    function handleLeftButtons() {
        stepsArr.push("l");
    }

    function handleRightButtons() {
        stepsArr.push("r");
    }

    function handleForwardButtons() {
        stepsArr.push("f");
    }

    async function handleGoButton() {

        const timer = ms => new Promise(res => setTimeout(res, ms))
        console.log(stepsArr);
        let coords = { ...beebot }
        for (let i = 0; i < stepsArr.length; i++){

            let s = stepsArr[i];

            if(s === "l"){
                if(coords.o === "n"){
                    updateBoard(coords.x, coords.y, "w");
                    coords = { ...coords, o: "w" };
                }else if(coords.o === "e"){
                    updateBoard(coords.x, coords.y, "n");
                    coords = { ...coords, o: "n" };
                }else if(coords.o === "s"){
                    updateBoard(coords.x, coords.y, "e");
                    coords = { ...coords, o: "e" };
                }else if(coords.o === "w"){
                    updateBoard(coords.x, coords.y, "s");
                    coords = { ...coords, o: "s" };
                } 
                
            }else if(s === "r"){
                if(coords.o === "n"){
                    updateBoard(coords.x, coords.y, "e");
                    coords = { ...coords, o: "e" };
                }else if(coords.o === "e"){
                    updateBoard(coords.x, coords.y, "s");
                    coords = { ...coords, o: "s" };
                }else if(coords.o === "s"){
                    updateBoard(coords.x, coords.y, "w");
                    coords = { ...coords, o: "w" };
                }else if(coords.o === "w"){
                    updateBoard(coords.x, coords.y, "n");
                    coords = { ...coords, o: "n" };
                } 
                
            }else if(s === "f"){
                if(coords.o === "n"){
                    updateBoard(coords.x-1, coords.y, coords.o);  
                    coords = { ...coords, x: coords.x - 1 };  
                }else if(coords.o === "e"){
                    updateBoard(coords.x, coords.y+1, coords.o);
                    coords = { ...coords, y: coords.y + 1 }; 
                }else if(coords.o === "s"){
                    updateBoard(coords.x+1, coords.y, coords.o);
                    coords = { ...coords, x: coords.x + 1 }; 
                }else if(coords.o === "w"){
                    updateBoard(coords.x, coords.y-1, coords.o);
                    coords = { ...coords, y: coords.y - 1 }; 
                }
            }
        await timer(1000);
        }        
    }


    function updateBoard(x, y, o) {

        let currState = getCurrState(x,y);
        setDirection(o);
        console.log(x,y,o);

        if(currState === 2){
            setBeebot({ x: x, y: y, o: o });
        
        }else if(currState === 3){
            setBeebot({ x: x, y: y, o: o });
            setFinishedGame(true);
        
        }else{
            console.log("Error: this way does not lead to the goal.");
            setGameOver(true);
        }
    }


    function getCurrState(x,y) {

        console.log('Getting current state for ', x,y);
        const currMap = 
        [
            [5, 2, 2, 0, 0, 1],
            [2, 4, 2, 0, 2, 2],
            [3, 2, 0, 0, 2, 5],
            [2, 5, 0, 3, 2, 3],
            [0, 0, 0, 2, 3, 4],
        ];        

        for (let i = 0; i < currMap.length; i++) {
            console.log(currMap[i]);
            for (let j = 0; j < currMap[i].length; j++) {
                console.log(i === x);
                if (i === x && j === y) {
                    return currMap[i][j];
                }
                
            }
            
        }
        
    }

    function increaseIndex() {
        setIndex(index+1);
    }

 
    return (
        <div className="game-background">
            <main>
                <Row>
                    {/* BeeBot which helps you during the game */}
                    <Col lg={3} md={3} sm={3}>
                        <Row>
                            <div className='message-assistant'>
                                    <p className='message-assistant-content'>
                                        {beebotInteraction[index]}
                                        <br></br>
                                        <button className='button-next' onClick={increaseIndex}>Weiter</button>
                                    </p>
                                </div>
                        </Row>
                        <Row>
                            <div className='beebot'>
                                <img src={BeeBotFigure} alt="beebot" height={120} width={150}></img>
                            </div>
                        </Row>
                    </Col>
                    {/* Board game with the associated buttons */}
                    <Col lg={9} md={9} sm={9}>
                        <Container>
                            <Board map={map[0]} beebot={beebot} getCurrState={getCurrState}></Board>
                        </Container>
                
                        <div className='button-container'>
                            <div className='button-wrapper'>
                                <button className='black-button'onClick={handleLeftButtons}>{'<-'}</button>
                                <button className='black-button' onClick={handleForwardButtons}>f</button>
                                <button className='black-button' onClick={handleRightButtons}>{'->'}</button>
                                <button className='green-button' onClick={handleGoButton}>GO</button>
                            </div>
                        </div>
            
                    </Col>
                </Row>
            
            </main>
            {/* Triggers message which says the current state of the game */}
            <Message color= {'#e24f3e'} trigger={gameOver} setTrigger= {setGameOver}>
                <h3>Probiere es nocheinmal</h3>
            </Message>
            <Message color= {'orange'} trigger={finishedGame} setTrigger= {setFinishedGame}>
                <h3>Gut gemacht.</h3>
                <p>
                BeeBot hat erfolgreich das Ziel erreicht.
                </p>
            </Message>
            
        </div>
    );
}

export default Game;
