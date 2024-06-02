import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Game } from './game';
import { Home } from './home';
import { Editor } from './editor';
import './App.css';


function App() {

  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/editor" element={<Editor />} />
        </Routes>
    </div>
);
}

export default App;
