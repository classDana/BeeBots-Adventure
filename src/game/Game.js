import React, { useState, useEffect } from 'react';
import Board from "./components/Board";
import Message from "./components/Message";
import BeeBotFigure from "../images/BeeBot_figure.png";
import { Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import jsonData from "./game_assets/beebot_phrases.json";
import './Game.css'

/*
    @Title: BeeBots Adventure
    @Name: Daniela Milisic
    @Date: xx.xx.xxxx
    
*/

function Game() {

    const navigate = useNavigate();
    const [steps, setSteps] = useState([]);
    const beebotInteraction = jsonData.phrases;
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState('e');
    const [gameOver, setGameOver] = useState(false);
    const [finishedLevel, setFinishedLevel] = useState(false);
    const [finishedGame, setFinishedGame] = useState(false);
    const [returnToHome, setReturnToHome] = useState(false);


     /*
    The game contains 3 levels from easy to hard.
    The data of each map contains six variables:
        0: This field is the goal.
        1: This field leads to the goal.
        2-5: These fields lead to a dead end.
    */

        const maps = [

            { id: 1, name: 'Level 1', data: [
              [5, 2, 2, 2, 2, 2],
              [2, 4, 2, 0, 1, 2],
              [3, 2, 0, 0, 2, 5],
              [2, 5, 0, 3, 2, 3],
              [2, 2, 2, 2, 3, 4],
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
                [0, 0, 0, 0, 2, 0],
                [0, 2, 3, 0, 0, 0],
            ]},
          ];

    /*
    Each map has its own start coordinates.
    The BeeBot is placed at the
    start of the game at the starting
    coordinates of the respective map
    */

    const startCoords = [
        { x: 3, y: 2, o: "n"},
        { x: 4, y: 0, o: "e"},
        { x: 0, y: 2, o: "n" },
    ];


    /*
    Get map by Level Id
    */

    const { levelId } = useParams();
    const getMapById = (levelId) => {
        return maps.find((map) => map.id === parseInt(levelId));
    };
    const map = getMapById(levelId);

    /*
    Get start Coords by Level Id
    */
    const getStartCoordsById = (levelId) => {
        return startCoords[levelId-1];
    };
    const startCoord = getStartCoordsById(levelId);

    const [beebot, setBeebot] = useState(startCoord);


    // Booleans for rendering HTML elements
    const isLevelOne = checkLevel(levelId);
    const isCompleted = checkCompletedInteraction();
    const [toggled, setToggled] = useState(false);

    const handleClose = () => {

        setReturnToHome(true);
      
      };

      useEffect(() => {
        if (isCompleted) {
            setSteps([]);
            setBeebot(startCoord);
        }
      }, [isCompleted]);

      useEffect(() => {
        if (finishedLevel) {
            let newLevelId = parseInt(levelId)+ 1;
            navigate(`/game/${newLevelId}`, { replace: true });
            // reset steps array
            setSteps([]);
            
            let newStartCoord = getStartCoordsById(newLevelId)
            setBeebot(newStartCoord);
        }
      }, [finishedLevel]);

      useEffect(() => {
        if (returnToHome) {
            console.log('success: ' + returnToHome);
            navigate(`/home`, { replace: true });
        }
        console.log('fail: ' + returnToHome);

      }, [returnToHome]);


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
            { name: 'forward', data: 'vorwärts' }
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

            if(parseInt(levelId) === 3){
                setFinishedGame(true);
            }else{
                setFinishedLevel(true);
            }
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
        return parseInt(levelId) === 1;
    }

    function checkCompletedInteraction() {
        return beebotInteraction[index] === undefined;
    }

    function renderInteraction() {
        if (!isCompleted) {
            return (
                    <p className='message-assistant-content' style={{textAlign: 'center'}}>
                        {beebotInteraction[index]}
                        <br></br>
                        <button className='button-next' onClick={increaseIndex}>Weiter</button>
                    </p>
                
              ); 
        }
        return (<div> {renderSteps()} </div>);
    }

    function renderSteps() {
        if (!toggled) {
            return (
                <p className='message-assistant-content'>
                    {steps.map(step => (
                    <div>{step.data}</div>))}
                </p>
              ); 
        }
        return null;
    }

    function renderButtons() {
        if (isLevelOne && !isCompleted) {
            return (
                <div className='button-wrapper'>
                    <button className='black-button' onClick={handleLeftButtons} disabled={index < 7}>
                        <FontAwesomeIcon icon={faArrowLeft} color="white" />
                    </button>
                    <button className={index === 3 || index === 7 ? 'black-button glow' : 'black-button'} onClick={handleForwardButtons} disabled={index < 3}>
                        <FontAwesomeIcon icon={faArrowUp} color="white" />
                    </button>
                    <button className={index === 7 ? 'black-button glow' : 'black-button'} onClick={handleRightButtons} disabled={index < 7}>
                        <FontAwesomeIcon icon={faArrowRight} color="white" />
                    </button>

                    <button className={index === 3 || index === 7 ? 'green-button glow' : 'green-button'} onClick={handleGoButton} disabled={index < 3}>GO</button>
                </div>
              ); 
        }
        return (
            <div className='button-wrapper'>
                <button className='black-button' onClick={handleLeftButtons}>
                    <FontAwesomeIcon icon={faArrowLeft} color="white" />
                </button>
                <button className='black-button' onClick={handleForwardButtons}>
                    <FontAwesomeIcon icon={faArrowUp} color="white" />
                </button>
                <button className='black-button' onClick={handleRightButtons}>
                    <FontAwesomeIcon icon={faArrowRight} color="white" />
                </button>

                <button className='green-button' onClick={handleGoButton}>GO</button>
            </div>
          );
    }

 
    return (
        <div className="game-background">
            <main>
                <Container fluid>
                <Row>
                    {/* BeeBot which helps you during the game */}
                    <Col lg={3} md={3} sm={3}>
                        <Row>
                            <div style={{ display: 'flex' }}>
                                <button className={`toggle-btn ${toggled ? "toggled": ""}`}
                                onClick={() => setToggled(!toggled)}>
                                    <div className='thumb'></div>
                                </button>
                                <p style={{ marginLeft: '18px', marginTop: '10px' }}>Schritte verbergen</p>
                                </div>
                        </Row>
                        <Row>
                            <div className='message-assistant'>
                                {isLevelOne ? <div> { renderInteraction() } </div> : <div> { renderSteps() } </div> }
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
                            <div className='button-container'> {renderButtons()} </div>
                            </Container>
                    </Col>
                </Row>
                </Container>
            
            </main>
            {/* Triggers message which says the current state of the game */}
            <Message color= {'#e24f3e'} trigger={gameOver} setTrigger= {setGameOver} onClose={() => setReturnToHome(true)}>
                <h1>Probiere es nocheinmal</h1>
            </Message>
            <Message color= {'orange'} trigger={finishedLevel} setTrigger= {setFinishedLevel}>
                <h1>Gut gemacht.</h1>
                <p>
                BeeBot hat erfolgreich das Ziel erreicht.
                </p>
            </Message>
            <Message color= {'green'} trigger={finishedGame} setTrigger= {setFinishedGame} onClose={handleClose}>
                <h1>Juhuu wir haben es geschafft!!</h1>
                <p>
                Danke für deine Hilfe! Wenn du magst kannst du 
                </p>
            </Message>
            
        </div>
    );
}

export default Game;
