import './Home.css' 
import Instruction from "./components/Instruction";
import directionButtons from "../images/directionButtons.png";
import goButton from "../images/goButton.png";
import reserveButton from "../images/reserveButton.png";
import { Container, Row, Col} from 'react-bootstrap';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [btnInstruction, setBtnInstruction] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="home-page">
            <Container>
                <Row className="justify-content-md-center">
                    <Col>
                        {/* Start button for the game */}
                        <button className="custom-button" onClick={() => navigate('/game/1')}>Starten</button>
                    </Col>
                    <Col>
                        {/* Instruction button */}
                        <button className="custom-button" onClick={() => setBtnInstruction(true)}>Anleitung</button>
                    </Col>
                </Row>
            </Container>

            {/* Instruction pop-up page*/}
            <Instruction trigger={btnInstruction} setTrigger = {setBtnInstruction}>
                <h1>Anleitung</h1>
                <div className="button-image">
                    <img src={directionButtons} alt="direction" height={140} width={190} ></img>
                </div>
                <p> Verwende die Richtungstasten, um den BeeBot zu programmieren.
                    Klicke auf die Pfeile, um den BeeBot vorwärts, nach links oder
                    nach rechts zu bewegen.</p>
                <div className="button-image">
                    <img src={goButton} alt="go" height={80} width={110}></img>
                </div>
                <p>Nachdem du den BeeBot programmiert hast, klicke auf "Go", um
                    zu sehen, wie der BeeBot deine Anweisungen ausführt.</p>
                <div className="button-image">
                    <img src={reserveButton} alt="go" height={100} width={140}></img>
                </div>
                <p>Wenn du das Ziel nicht geschafft hast oder bei den Schritten einen Fehler gemacht hast,
                    kannst du mit dem "Zurück" Knopf die Schritte zurücksetzen.</p>
            </Instruction>
                
        </div>
    );
}

export default Home;