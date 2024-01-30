import React from 'react';
import { useState } from "react";

import { useApi } from '../hooks';
import { useStateContext } from '../context';
import { ReactComponent as SvgFeedbackQR } from '../assets/svg/svgFeedbackQR.svg';

const Settings = () => {
    const [ pin, setPin ] = useState(false);
    const [ isAuth, setIsAuth ] = useState(false);
    const [ isAuthError, setIsAuthError ] = useState(false);
    const [ isAuthPending, setIsAuthPending ] = useState(false);

    const api = useApi();
    const stateContext = useStateContext();

    function handleAuth() {        
        if (false === pin) {
            setIsAuthError(true);
            return;
        }

        setIsAuthError(false);
        setIsAuthPending(true);

        api.auth(pin).then(response => {
            setPin(false);
            setIsAuthPending(false);

            if (response.ok) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
                setIsAuthError(true);
            }
        });
    }

    function handleRestart() {
        api.reboot().then(response => {
            if (response.ok) {
                
            } else {
                
            }
        });
    }

    function handleShutDown() {
        api.shutdown().then(response => {
            if (response.ok) {
                
            } else {
                
            }
        });
    }

    function handleSignout() {
        setPin(false);
        setIsAuth(false);
        setIsAuthError(false);
        setIsAuthPending(false);
    }

    return (
        <div className="content p-5 settings"> 
            <h1 className="label">Настройки</h1>      

            <div className="pb-6">
                {
                    isAuth
                    ? <>
                        <div className="columns">
                            <div className="column is-8 has-text-left">
                                <button 
                                    onClick={handleRestart}
                                    className="button is-danger mr-5" 
                                >Рестарт</button>
                                <button 
                                    onClick={handleShutDown}
                                    className="button is-danger mr-5" 
                                >Изключи</button>                            
                            </div>
                            <div className="column is-4 has-text-right">
                                <button 
                                    onClick={handleSignout}
                                    className="button is-primary" 
                                >Излез</button>
                            </div>    
                        </div> 
                    </>
                    : <>
                        <div className="field">      
                            <input                         
                                type="password" 
                                className="input" 
                                placeholder="Въведи PIN" 
                                value={pin ? pin : ""}
                                onChange={e => setPin(e.target.value)}
                            />                        
                            {isAuthError && (
                                <p className="has-text-danger">Невалиден PIN. Опитайте отново.</p>
                            )}
                        </div>
                        <div className="field has-text-right">                        
                            <button 
                                onClick={handleAuth}
                                className="button is-primary" 
                            >Влез {
                                isAuthPending
                                ? "..."
                                : ""
                            }</button>                        
                        </div> 
                    </>
                }  
            </div>        

            <div className="mt-6">
                <h1 className="label">Обратна връзка</h1>
                <p>Ако възникне грешка с устройство на ReKosh и искате да съобщите за проблема, моля изпратете ни имейл с повече подробности на hi@rekosh.io.</p>
                {
                    stateContext.state !== null && stateContext.state.error.status &&
                    <>
                        <p className="mt-6">Текущи грешки:</p>
                        <p className="has-text-danger">{stateContext.state.error.message}</p>
                    </>
                }
                {/* <SvgFeedbackQR /> */}
            </div>
        </div>
    );
}

export default Settings;