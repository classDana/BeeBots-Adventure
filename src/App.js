import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Game } from './game';
import { Home } from './home';
import './App.css';


function App() {

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
