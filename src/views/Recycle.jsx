import React from 'react';
import { useState, useEffect, useRef, useCallback } from "react";

import { useApi } from '../hooks';
import { useStateContext } from '../context';

import imgSuccess from '../assets/img/success.png';
import imgSoftDrink from '../assets/img/soft-drink.png';

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

const Recycle = () => {
    const sessionDuraction = 30;

    const api = useApi();
    const intervalRef = useRef(0);
    const stateContext = useStateContext();
    const [ timeLeft, setTimeLeft ] = useState(sessionDuraction);
    const [prevSessionState, setPrevSessionState] = useState('ON_HOLD');

    function handleStart() {
        api.start();
    }
    
    const handleStop = useCallback(() => {
        api.stop().then(response => {
            if (response.ok) {
                stopCountdown();
            } else {
                // Handle error
            }
        });
    }, [api]);

    const startCountdown = useCallback(() => {    
        setTimeLeft(sessionDuraction);
    
        const intervalId = setInterval(() => {            
            setTimeLeft(prevCountDown => {    
                if (prevCountDown <= 0) {
                    clearInterval(intervalId);
                    handleStop();
                    return 0;
                }
    
                return prevCountDown - 1;
            });
        }, 1000);
    
        intervalRef.current = intervalId;
    }, [sessionDuraction, handleStop]);
    

    function stopCountdown() {
        clearInterval(intervalRef.current);
    }

    useEffect(() => {  
        // if (
        //     prevSessionState !== "INCORRECT_OBJECT" 
        //     && 
        //     stateContext.state?.session?.status === "IN_PROGRESS"
        // )
        // {            
        //     startCountdown();        
        // }

        setPrevSessionState(stateContext.state?.session?.status);
    }, [prevSessionState, stateContext.state?.session?.status, startCountdown]);

    return (
        <div className="container is-flex is-flex-direction-column h-96vh">
            <div className="content has-text-centered mt-4">
                <h1 id="recycleTitle" className="mt-6">PET Бутилка</h1>
                {/* <h1 id="recycleTDuration" className="mb-0">Продължителност:</h1> */}
                {/* <div id="recycleTimer">{formatTime(timeLeft)}</div> */}
            
                <img 
                    id="recycleBottle" 
                    alt="Recycle bottle"
                    src={imgSoftDrink} 
                />
                
                <div id="recycleNumberOfEnteredItems">
                    <span className="x">X</span>
                    <span id="recycleCount" className="ml-4">{stateContext.state !== null && stateContext.state.session.items}</span>
                </div>               
                
                <h2 id="recycleIncorrectItem" className="has-text-centered">Машината не приема опаковки от типа<br /><span id="recycleIncorrectItemType"></span></h2>
                
                <img id="recycleImgSuccess" src={imgSuccess} alt="Success"/>            
                <h2 id="recycleTextSuccess" className=" has-text-centered">Успешно рециклирани бутилки</h2>

                {/* <button id="recycleStartButton" onClick={handleStart}>СТАРТ</button> */}
                <button id="recycleStopButton" onClick={handleStop}>СПРИ</button>
            </div>        
        </div>
    );
}

export default Recycle;