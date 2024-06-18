import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Game } from './game';
import { Home } from './home';
import './App.css';


function App() {
    const levels = useState([
        { id: 1, name: 'Level 1', data: [
          [5, 2, 2, 0, 0, 1],
          [2, 4, 2, 0, 2, 2],
          [3, 2, 0, 0, 2, 5],
          [2, 5, 0, 3, 2, 3],
          [0, 0, 0, 2, 3, 4],
        ]},
        { id: 2, name: 'Level 2', data: [
          [1, 1, 1, 2, 2, 2],
          [1, 1, 1, 2, 1, 1],
          [1, 1, 2, 2, 1, 1],
          [2, 2, 2, 1, 1, 1],
        ]},
        { id: 3, name: 'Level 3', data: [
          [1, 1, 1, 2, 2, 2],
          [1, 1, 1, 2, 1, 1],
          [1, 1, 2, 2, 1, 1],
          [2, 2, 2, 1, 1, 1],
        ]},
      ]);

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
