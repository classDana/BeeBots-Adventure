import './Home.css' 
import Instruction from "./components/Instruction";
import directionButtons from "../images/directionButtons.png";
import goButton from "../images/goButton.png";
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
                        {/* Introduction button */}
                        <button className="custom-button" onClick={() => setBtnInstruction(true)}>Anleitung</button>
                    </Col>
                </Row>
            </Container>
                
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
            </Instruction>
                
        </div>
    );
}

export default Home;