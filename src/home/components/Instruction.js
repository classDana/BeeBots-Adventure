import React from 'react'
import './Instruction.css'

function Instruction(props) {
  return (props.trigger) ?  (
    <div className='instruction-page'>
        <div className='instruction-content'>
            <button className='close-btn' onClick={() => props.setTrigger(false)}>
                x</button>
                {props.children}
        </div>
      
    </div>
  ) : "";
}

export default Instruction;
