import './GameBoard.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Message(props) {
  const navigate = useNavigate();
  function returnToStart(){
    navigate(`/`)
  }
  return (props.trigger) ? (
    <div className='message-page'>
      <div className='message-content' style={{ backgroundColor: props.color }}>
        {props.children}
        {props.gameStatus === true ? (
          <p>
            <button className='return-button' style={{backgroundColor: 'lightgreen', width: '180px', height: '40px'}} onClick={returnToStart}>
              Zurück zur Startseite
            </button>
          </p>
        ) : (
          <button className='close-button' onClick={() => props.setTrigger(false)}>
            x
          </button>
        )}
      </div>
    </div>
  ) : "";
}

export default Message;
