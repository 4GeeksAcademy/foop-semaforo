import React, { useState, useEffect, useRef } from 'react';

const DURATIONS = {
    red: 15000,
    green: 15000,
    yellow: 5000
};

// Orden para el ciclo
const NEXT_COLOR = {
    red: 'green',
    green: 'yellow',
    yellow: 'red'
};

const Semaforo = () => {
    const [activeColor, setActiveColor] = useState('red');
    const [isBlinking, setIsBlinking] = useState(false);
    const timerRef = useRef(null);
    const changeColor = (newColor) => {
        setIsBlinking(true);
        setTimeout(() => {
            setIsBlinking(false);
            setActiveColor(newColor);
        }, 1000); 
    };

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        const duration = DURATIONS[activeColor];
        const nextColor = NEXT_COLOR[activeColor];

        // Creamos un nuevo temporizador
        timerRef.current = setTimeout(() => {
            changeColor(nextColor);
        }, duration);

        // Función de limpieza:
         return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [activeColor]); 

    //Click
    const handleLightClick = (clickedColor) => {
        if (clickedColor === activeColor) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            
            const nextColor = NEXT_COLOR[activeColor];
            changeColor(nextColor);
        }
    };

    return (
        <div className="traffic-light-container">
            {/*Poste del semaforo */}
            <div className="traffic-light-post"></div>

            {/* Caja de Luces */}
            <div className="traffic-light">
                <div
                    className={`light red ${activeColor === 'red' ? 'active' : ''} ${isBlinking && activeColor === 'red' ? 'blink' : ''}`}
                    onClick={() => handleLightClick('red')}
                ></div>
                <div
                    className={`light yellow ${activeColor === 'yellow' ? 'active' : ''} ${isBlinking && activeColor === 'yellow' ? 'blink' : ''}`}
                    onClick={() => handleLightClick('yellow')}
                ></div>
                <div
                    className={`light green ${activeColor === 'green' ? 'active' : ''} ${isBlinking && activeColor === 'green' ? 'blink' : ''}`}
                    onClick={() => handleLightClick('green')}
                ></div>
            </div>
        </div>
    );
};

export default Semaforo;