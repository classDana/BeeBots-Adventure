import React, { useEffect, useState } from 'react';
import jsonData from "../game_assets/beebot_phrases.json";

const BeeBotUI = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    let botui;

    useEffect(() => {
        // Überprüfen, ob BotUI und Vue im globalen Scope verfügbar sind
        if (window.BotUI && window.Vue) {
            // BotUI-Instanz erstellen
            botui = new window.BotUI('botui-app');

            // Nachrichten aus der JSON-Datei laden
            fetch(jsonData)
                .then(response => response.json())
                .then(data => {
                    setMessages(data.messages);
                    displayNextMessage();
                });
        } else {
            console.error("BotUI or Vue is not available");
        }
    }, []);

    const displayNextMessage = () => {
        if (botui && currentMessageIndex < messages.length) {
            botui.message.add({
                content: messages[currentMessageIndex],
                delay: 500
            }).then(() => {
                setCurrentMessageIndex(currentMessageIndex + 1);
            });
        }
    };

    const handleNext = () => {
        displayNextMessage();
    };

    return (
        <div>
            <div id="botui-app"></div>
            {currentMessageIndex < messages.length && (
                <button onClick={handleNext}>Weiter</button>
            )}
        </div>
    );
};

export default BeeBotUI;
