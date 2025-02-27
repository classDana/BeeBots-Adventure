import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Game } from './game';
import { Home } from './home';
import { useEffect } from 'react';
import './App.css';

/*
    @Title: BeeBots Adventure
    @Name: Daniela Milisic
    @Date: xx.xx.xxxx
    
*/


function App() {

    // deactivate scrolling
    useEffect(() => {
        document.body.style.overflow = 'hidden';
      }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:levelId" element={<Game />} />
            </Routes>
        </div>
    );
}

export default App;

