import React, { useState } from 'react';
import beebot from "./logo512.png";


const BeeBot = ({ orientation }) => {

    function updateBeeBot() {
        
    }
   
    return (
        <img src={beebot} alt='beebot' height={90} width={100}></img>
      );
    };
  
  export default BeeBot;