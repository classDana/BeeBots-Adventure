import React from 'react'
import '../Game.css'

function Message(props) {
  return (props.trigger) ?  (
    <div className='message-page'>
        <div className='message-content' style={{ backgroundColor: props.color }}>
            <button className='close-btn' onClick={() => props.setTrigger(false)}>
                x</button>
                {props.children}
        </div>
      
    </div>
  ) : "";
}

export default Message;

