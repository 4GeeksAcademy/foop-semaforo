import React, {useState, useEffect, useCallback} from 'react';

const Semaforo = () => {
        const [color, setColor] = useState('red');

    //Ciclo de Colores
    const nextColor = useCallback(() => {
        if (color === 'red') {
            setColor('green'); // Rojo a Verde
        } else if (color === 'green') {
            setColor('yellow'); // Verde a Amarillo
        } else if (color === 'yellow') {
            setColor('red'); // Amarillo a Rojo
        }
    }, [color]);

    // Efecto para el temporizador automático
    useEffect(() => {
        const durations = {
            red: 15000,    
            green: 15000,  
            yellow: 5000   
        };

        const timer = setTimeout(() => {
            nextColor();
        }, durations[color]);

        return () => {
            clearTimeout(timer);
        };
    }, [color, nextColor]);

    // Función clic Luz Activa
    const handleLightClick = (clickedColor) => {
        if (color === clickedColor) {
            nextColor();
        }
    };

    return (
        // Contenedor principal que centra el semáforo
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            
            {/* El poste del semáforo */}
            <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-4 border-4 border-gray-700">
                
                {/* Luz Roja */}
                <div 
                    className={
                        "w-24 h-24 rounded-full bg-red-900 transition-all duration-200 cursor-pointer " +
                        (color === 'red' ? "bg-red-500 shadow-[0_0_25px_5px_#ef4444]" : "")
                    }
                    onClick={() => handleLightClick('red')}
                />
                
                {/* Luz Amarilla */}
                <div 
                    className={
                        "w-24 h-24 rounded-full bg-yellow-900 transition-all duration-200 cursor-pointer " +
                        (color === 'yellow' ? "bg-yellow-400 shadow-[0_0_25px_5px_#facc15]" : "")
                    }
                    onClick={() => handleLightClick('yellow')}
                />
                
                {/* Luz Verde */}
                <div 
                    className={
                        "w-24 h-24 rounded-full bg-green-900 transition-all duration-200 cursor-pointer " +
                        (color === 'green' ? "bg-green-500 shadow-[0_0_25px_5px_#22c55e]" : "")
                    }
                    onClick={() => handleLightClick('green')}
                />
            </div>
        </div>
    );
};

export default Semaforo;