import React, { useEffect, useRef, useState } from "react";

export const Counter = () => {

    const [time, setTime] = useState(0); // Tiempo en segundos
    const [running, setRunning] = useState(true); // Estado del contador (activo/inactivo)
    const timer = useRef(); // Referencia al intervalo

    useEffect(() => {
        if (running) {
            timer.current = setInterval(() => {
                setTime(pre => pre + 1) //Para incrementar el tiempo cada segundo
            }, 1000)
        }
        return () => clearInterval(timer.current); // Para limpiar el intervalo cuando se desmonta o cambia el estado
    }, [running]);

    //Función para resetear el tiempo
    const formatTime = (time) => {
        const hours = String(Math.floor(time / 3600)).padStart(2,"0"); //calculo de la hora, dividiendo entre 3600 (1 horas = 3600 segundos), convirtiendo en cadena de texto y que este tenga dos digitos (de 00 a 60)
        const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
        const seconds = String(time % 60).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className="flux-counter-container">
            <div className="flux-timer">{formatTime(time)}</div>
            <div className="flux-button mt-4">
                <button onClick={() => setTime(0)} className="flux-btn flux-btn-red">Restart</button>
                <button onClick={() => setRunning(!running)}
                    className={`flux-btn ${running ? "flux-btn-blue" : "flux-btn-green"}`}>
                        {running ? "Stop" : "Resume"}
                    </button>
            </div>
        </div>
    )
}
