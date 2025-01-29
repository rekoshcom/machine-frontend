import { createContext, useState, useEffect, useContext, useCallback } from "react";

import { useApi } from '../hooks';

const StateContext = createContext("StateContext");

const StateContextProvider = ({children}) => {
    const api = useApi();
    const [state, setState] = useState(null);
    const [isGetStatePending, setIsGetStatePending] = useState(false);

    const [sessionState, setSessionState] = useState('ON_HOLD');
    const [sessionItems, setSessionItems] = useState(0);
    const [sessionCurrentObjectType, setSessionCurrentObjectType] = useState('');
    const [prevSessionState, setPrevSessionState] = useState('ON_HOLD');

    const percentageToDegrees = useCallback((percentage) => {
        return (180 * percentage) / 100;
    }, []);

    const rotateTheMeter = useCallback((remaining_in_degree) => {
        const element = document.getElementById("rotating-element");
        if (element !== null) {
            element.style.transform = `rotate(${remaining_in_degree}deg)`;
        }
    }, []);

    function rotateTheMeterHand(remaining_in_degree) {
        const element = document.getElementById("meter-hand");
        if (element !== null) {
            element.style.transform = `rotate(${remaining_in_degree - 90}deg)`;
        }
    }

    const formatNumberWithSpace = useCallback((number) => {
        return number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            useGrouping: true,
        }).replace(',', ' ');
    }, []);

    const getState = useCallback(async () => {
        if (isGetStatePending) return;
        
        setIsGetStatePending(true);
        await api.getState().then(response => {
            setIsGetStatePending(false);
            
            if (response.ok) {
                let data = response.data;
                
                // Calculate remaining
                let remaining = data.target - data.collected.items;
                let remaining_in_percentage = 100 - (remaining * 100 / data.target);
                let remaining_in_degree = percentageToDegrees(remaining_in_percentage);
                                
                data['remaining'] = remaining.toLocaleString('fr-FR').replace(/,/g, ' ');
                data['remaining_in_percentage'] = remaining_in_percentage.toFixed(2);
                
                // Format numbers                
                data.collected.items = data.collected.items.toLocaleString('fr-FR').replace(/,/g, ' ');
                data.collected.weight.amount = formatNumberWithSpace(data.collected.weight.amount);
                data.collected.finances.amount = formatNumberWithSpace(data.collected.finances.amount);
                data.eco_influence.cotwo.amount = formatNumberWithSpace(data.eco_influence.cotwo.amount);
                data.eco_influence.energy.amount = formatNumberWithSpace(data.eco_influence.energy.amount);
                
                // Actions related to the meter
                rotateTheMeter(remaining_in_degree);
                //rotateTheMeterHand(remaining_in_degree);
                
                // Recycling
                setSessionItems(data.session.items);
                setSessionCurrentObjectType(data.session.current_object_type);
                setSessionState(data.session.status);

                setState(data);
            }
        });
    }, [api, isGetStatePending, percentageToDegrees, formatNumberWithSpace, rotateTheMeter]);

    useEffect(() => {
        const elementRecycleTitle = document.getElementById("recycleTitle");

        // const elementRecycleTDuration = document.getElementById("recycleTDuration");
        // const elementRecycleTimer = document.getElementById("recycleTimer");

        const elementRecycleBottle = document.getElementById("recycleBottle");

        const elementRecycleNumberOfEnteredItems = document.getElementById("recycleNumberOfEnteredItems");
        const elementRecycleIncorrectItem = document.getElementById("recycleIncorrectItem");        
        // const elementRecycleIncorrectItemType = document.getElementById("recycleIncorrectItemType");

        const elementRecycleImgSuccess = document.getElementById("recycleImgSuccess");        
        const elementRecycleTextSuccess = document.getElementById("recycleTextSuccess");

        // const elementRecycleStartButton = document.getElementById("recycleStartButton");
        const elementRecycleStopButton = document.getElementById("recycleStopButton");

        function setInProgress() {
            elementRecycleTitle.style.display = 'none';
            // elementRecycleTDuration.style.display = 'block';
            // elementRecycleTimer.style.display = 'block';
            
            elementRecycleBottle.style.display = 'block';
            elementRecycleBottle.style.width = `80px`;
            elementRecycleBottle.style.transform = `rotate(0deg)`;
            elementRecycleBottle.style.top = `26%`;
            elementRecycleBottle.style.left = `27%`;

            elementRecycleIncorrectItem.style.display = 'none';

            elementRecycleNumberOfEnteredItems.style.display = 'block';                
            
            elementRecycleImgSuccess.style.display = 'none';

            elementRecycleTextSuccess.style.display = 'none';            
            // elementRecycleStartButton.style.display = 'none';
            elementRecycleStopButton.style.display = 'block';
        }

        function setIncorrectObject(sessionCurrentObjectType) {            
            elementRecycleTitle.style.display = 'none';
            // elementRecycleTDuration.style.display = 'block';
            // elementRecycleTimer.style.display = 'block';
            
            elementRecycleBottle.style.display = 'block';
            elementRecycleBottle.style.width = `80px`;
            elementRecycleBottle.style.transform = `rotate(0deg)`;
            elementRecycleBottle.style.top = `26%`;
            elementRecycleBottle.style.left = `27%`;

            elementRecycleIncorrectItem.style.display = 'block';
            // elementRecycleIncorrectItemType.innerHTML = sessionCurrentObjectType;

            elementRecycleNumberOfEnteredItems.style.display = 'block';                
            
            elementRecycleImgSuccess.style.display = 'none';

            elementRecycleTextSuccess.style.display = 'none';            
            // elementRecycleStartButton.style.display = 'none';
            elementRecycleStopButton.style.display = 'block';
        }

        function setSuccess() {
            elementRecycleTitle.style.display = 'none';
            // elementRecycleTDuration.style.display = 'none';
            // elementRecycleTimer.style.display = 'none';
            
            elementRecycleBottle.style.display = 'none';
            elementRecycleBottle.style.width = `140px`;
            elementRecycleBottle.style.transform = `rotate(90deg)`;
            elementRecycleBottle.style.top = `5%`;
            elementRecycleBottle.style.left = `32%`;

            elementRecycleIncorrectItem.style.display = 'none';

            elementRecycleNumberOfEnteredItems.style.display = 'none';                
            
            elementRecycleImgSuccess.style.display = 'block';

            elementRecycleTextSuccess.style.display = 'block';                
            // elementRecycleStartButton.style.display = 'none';
            elementRecycleStopButton.style.display = 'none';
        }

        function setOnHold() {
            elementRecycleTitle.style.display = 'block';
            // elementRecycleTDuration.style.display = 'none';
            // elementRecycleTimer.style.display = 'none';
            
            elementRecycleBottle.style.display = 'block';
            elementRecycleBottle.style.width = `140px`;
            elementRecycleBottle.style.transform = `rotate(90deg)`;
            elementRecycleBottle.style.top = `5%`;
            elementRecycleBottle.style.left = `32%`;

            elementRecycleIncorrectItem.style.display = 'none';

            elementRecycleNumberOfEnteredItems.style.display = 'none';                
            
            elementRecycleImgSuccess.style.display = 'none';

            elementRecycleTextSuccess.style.display = 'none';                
            // elementRecycleStartButton.style.display = 'block';
            elementRecycleStopButton.style.display = 'none';
        }

        if (
            prevSessionState !== "ON_HOLD"
            &&
            sessionState === "ON_HOLD"
            &&            
            sessionItems > 0
        ) {
            setSuccess();    

            setTimeout(() => {
                setOnHold();
            }, "3000");
        } else {
            switch (sessionState) {  
                case 'IN_PROGRESS':
                    setInProgress();
                    break;                      
                case 'INCORRECT_OBJECT':
                    setIncorrectObject(sessionCurrentObjectType);
                    break;
                case 'ON_HOLD':
                default:
                    setOnHold();
                    break;
            }
        }        

        setPrevSessionState(sessionState);
    }, [prevSessionState, sessionItems, sessionState, sessionCurrentObjectType]);


    useEffect(() => {
        const timeoutInterval = 100;

        const interval = setInterval(() => {
            getState();
        }, timeoutInterval);

        return () => clearInterval(interval);
    }, [getState]);

    return (
        <StateContext.Provider
            value={{
                state: state
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

const useStateContext = () => {
    const stateContext = useContext(StateContext);
    if (stateContext === undefined) {
        throw new Error('stateContext must be used within a StateContext.')
    }

    return stateContext;
};

export { useStateContext, StateContextProvider };