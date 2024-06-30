import React, { useState, useEffect } from 'react';
import Board from "./components/Board";
import Message from "./components/Message";
import BeeBotFigure from "../images/BeeBot_figure.png";
import { Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import jsonData from "./game_assets/beebot_phrases.json";
import './Game.css'

/*
    @Title: BeeBots Adventure
    @Name: Daniela Milisic
    @Date: xx.xx.xxxx
    
*/

function Game() {

    const [steps, setSteps] = useState([]);
    const beebotInteraction = jsonData.phrases;
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState('e');
    const [beebot, setBeebot] = useState({ x: 4, y: 0, o: 'e' });
    const [gameOver, setGameOver] = useState(false);
    const [finishedGame, setFinishedGame] = useState(false);

     /*
    The game contains 3 levels from easy to hard.
    The data of each map contains six variables:
        0: This field is the goal.
        1: This field leads to the goal.
        2-5: These fields lead to a dead end.
    */

        const maps = [

            { id: 1, name: 'Level 1', data: [
              [5, 2, 2, 0, 0, 1],
              [2, 4, 2, 0, 2, 2],
              [3, 2, 0, 0, 2, 5],
              [2, 5, 0, 3, 2, 3],
              [0, 0, 0, 2, 3, 4],
            ]},
            { id: 2, name: 'Level 2', data: [
                [5, 2, 2, 0, 0, 1],
                [2, 4, 2, 0, 2, 2],
                [3, 2, 0, 0, 2, 5],
                [2, 5, 0, 3, 2, 3],
                [0, 0, 0, 2, 3, 4],
            ]},
            { id: 3, name: 'Level 3', data: [
                [1, 0, 0, 3, 3, 5],
                [2, 4, 0, 0, 0, 0],
                [3, 2, 3, 3, 2, 0],
                [2, 0, 0, 0, 2, 0],
                [0, 0, 3, 0, 0, 0],
            ]},
          ];


    const { levelId } = useParams();
    const getMapById = (levelId) => {
        return maps.find((map) => map.id === parseInt(levelId));
    };
    const map = getMapById(levelId);
    const isLevelOne = checkLevel(levelId);


    const [hideSteps, setHideSteps] = useState(false); 

    const handleToggle = (event) => {
        setHideSteps(event.target.checked); // update the state variable
      };

    


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
        setSteps([
            ...steps,
            { name: 'left', data: '90 Grad nach links' }
          ]);
    }

    function handleRightButtons() {
        setSteps([
            ...steps,
            { name: 'right', data: '90 Grad nach rechts' }
          ]);
    }

    function handleForwardButtons() {
        setSteps([
            ...steps,
            { name: 'forward', data: 'ein Schritt nach vorne' }
          ]);
    }

    async function handleGoButton() {

        const timer = ms => new Promise(res => setTimeout(res, ms))
        let coords = { ...beebot }
        for (let i = 0; i < steps.length; i++){

            let s = steps[i].name;

            if(s === "left"){
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
                
            }else if(s === "right"){
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
                
            }else if(s === "forward"){
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



    /**
     * 
     * @param {*} x x-coordinate
     * @param {*} y y-ccordinate
     * @param {*} o orientation
     * 
     * Function returns the updated map after each change 
     * from the .. TODO
     */

    function updateBoard(x, y, o) {

        let currState = getCurrState(x,y);
        setDirection(o);

        if(currState === 0){
            setBeebot({ x: x, y: y, o: o });
        
        }else if(currState === 1){
            setBeebot({ x: x, y: y, o: o });
            setFinishedGame(true);
        
        }else{
            console.log("Error: this way does not lead to the goal.");
            setGameOver(true);
        }
    }


    function getCurrState(x,y) {
        const currMap = map.data;      
        for (let i = 0; i < currMap.length; i++) {
            for (let j = 0; j < currMap[i].length; j++) {
                if (i === x && j === y) {
                    return currMap[i][j];
                }
            }   
        } 
    }

    function increaseIndex() {
        setIndex(index+1);
    }

    function checkLevel(levelId) {
        return parseInt(levelId) === 1
    }

    function renderInteraction(props) {
        const isLevelOne = props.isLevelOne;
        if (isLevelOne) {
            return (
                <div className='message-assistant'>
                    <p className='message-assistant-content'>
                        {beebotInteraction[index]}
                        <br></br>
                        <button className='button-next' onClick={increaseIndex}>Weiter</button>
                    </p>
                </div>
              ); 
        }
        return null;
    }

 
    return (
        <div className="game-background">
            <main>
                <Row>
                    {/* BeeBot which helps you during the game */}
                    <Col lg={3} md={3} sm={3}>
                    <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleToggle}></input>
                                <label class="form-check-label" for="flexSwitchCheckDefault">Schritte verbergen</label>
                            </div>
                        <Row>
                            <div className='message-assistant'>
                            {isLevelOne ? (<p className='message-assistant-content'>
                                                {beebotInteraction[index]}
                                                <br></br>
                                                <button className='button-next' onClick={increaseIndex}>Weiter</button>
                                            </p>)
                                            : (hideSteps ? null : (

                                                (<p className='message-assistant-content'>
                                                    {steps.map(step => (
                                                    <li>{step.data}</li>))}
                                                </p>)
                                              ))}
                                
                            </div>
                        </Row>
                        <Row>
                            <div className='beebot'>
                                <img src={BeeBotFigure} alt="beebot" height={120} width={150}></img>
                            </div>
                        </Row>
                    </Col>
                    {/* Board game with the associated buttons */}
                    <Col lg={8} md={9} sm={9}>
                            <Container style={{ marginBottom: '-310px' }}>
                                <Board map={map.data} beebot={beebot} getCurrState={getCurrState}></Board>
                            </Container>
                    
                            <Container className="mt-1">
                            <div className='button-container'>
                                <div className='button-wrapper'>
                                    <button className={index === 3 ? 'black-button glow' : 'black-button'} onClick={handleLeftButtons} disabled={index < 3}>
                                        <FontAwesomeIcon icon={faArrowLeft} color="white" />
                                    </button>
                                    <button className={index === 2 ? 'black-button glow' : 'black-button'} onClick={handleForwardButtons} disabled={index < 2}>
                                        <FontAwesomeIcon icon={faArrowUp} color="white" />
                                    </button>
                                    <button className={index === 3 ? 'black-button glow' : 'black-button'} onClick={handleRightButtons} disabled={index < 3}>
                                        <FontAwesomeIcon icon={faArrowRight} color="white" />
                                    </button>

                                    <button className={index === 2 ? 'green-button glow' : 'green-button'} onClick={handleGoButton}>GO</button>
                                </div>
                            </div>
                            </Container>
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
