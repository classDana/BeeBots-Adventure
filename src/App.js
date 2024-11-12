import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Game } from './game';
import { Home } from './home';
import { useEffect } from 'react';
import './App.css';


function App() {
    useEffect(() => {
        // Scrollen deaktivieren
        document.body.style.overflow = 'hidden';
    
        // Scrollen wieder aktivieren, wenn der Effekt entfernt wird
        return () => {
          document.body.style.overflow = 'auto';
        };
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
