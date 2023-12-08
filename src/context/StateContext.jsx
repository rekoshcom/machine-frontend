import { createContext, useState, useEffect, useContext } from "react";

import { useApi } from '../hooks';

const StateContext = createContext("StateContext");

const StateContextProvider = ({children}) => {
    const api = useApi();
    const [state, setState] = useState(null);
    const [isGetStatePending, setIsGetStatePending] = useState(false);
    const [objectRecognitionState, setObjectRecognitionState] = useState('NOT_INSERTED');

    function percentageToDegrees(percentage) {
        return (180 * percentage) / 100;
    }

    function rotateTheMeter(remaining_in_degree) {
        const element = document.getElementById("rotating-element");
        if (element !== null) {
            element.style.transform = `rotate(${remaining_in_degree}deg)`;
        }
    }

    function rotateTheMeterHand(remaining_in_degree) {
        const element = document.getElementById("meter-hand");
        if (element !== null) {
            element.style.transform = `rotate(${remaining_in_degree - 90}deg)`;
        }
    }

    async function getState() {
        if (isGetStatePending) return;

        setIsGetStatePending(true);
        await api.getState().then(response => {
            setIsGetStatePending(false);

            if (response.ok) {
                let data = response.data;

                // Calculate remaining
                let remaining = data.goal_of_collected_items - data.collected.items;
                let remaining_in_percentage = 100 - (remaining * 100 / data.goal_of_collected_items);
                let remaining_in_degree = percentageToDegrees(remaining_in_percentage);

                data['remaining'] = remaining.toLocaleString('fr-FR').replace(/,/g, ' ');
                data['remaining_in_percentage'] = remaining_in_percentage.toFixed(2);

                // Format numbers
                data.eco_influence.amount = data.eco_influence.amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
                data.collected.items = data.collected.items.toLocaleString('fr-FR').replace(/,/g, ' ');
                data.collected.weight.amount = data.collected.weight.amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
                data.collected.finances.amount = data.collected.finances.amount.toLocaleString('en-US', { minimumFractionDigits: 2 });

                // Actions related to the meter
                rotateTheMeter(remaining_in_degree);
                rotateTheMeterHand(remaining_in_degree);

                // Recycling
                setObjectRecognitionState(data.object_recognition_state)

                setState(data);
            }
        });
    };

    useEffect(() => {
        const elementCircle = document.getElementById("circle");
        const elementRectangle = document.getElementById("rectangle");

        const elementImgError = document.getElementById("imgError");
        const elementImgSuccess = document.getElementById("imgSuccess");
        const elementImgWaterBottleBig = document.getElementById("imgWaterBottleBig");

        switch (objectRecognitionState) {
            case 'INSERTED':
                elementCircle.style.display = 'none';
                elementRectangle.style.display = 'block';
                elementImgSuccess.style.display = 'none';
                elementImgError.style.display = 'none';

                elementImgWaterBottleBig.style.transform = `rotate(-14deg)`;
                elementImgWaterBottleBig.style.top = `7%`;
                elementImgWaterBottleBig.style.left = `13%`;
                break;
            case 'CORRECT_OBJECT':
                elementCircle.style.display = 'none';
                elementRectangle.style.display = 'block';
                elementImgSuccess.style.display = 'block';
                elementImgError.style.display = 'none';

                elementImgWaterBottleBig.style.transform = `rotate(-14deg)`;
                elementImgWaterBottleBig.style.top = `7%`;
                elementImgWaterBottleBig.style.left = `13%`;
                break;
            case 'INCORRECT_OBJECT':
                elementCircle.style.display = 'none';
                elementRectangle.style.display = 'block';
                elementImgSuccess.style.display = 'none';
                elementImgError.style.display = 'block';

                elementImgWaterBottleBig.style.transform = `rotate(-14deg)`;
                elementImgWaterBottleBig.style.top = `7%`;
                elementImgWaterBottleBig.style.left = `13%`;
                break;
            case 'NOT_INSERTED':
            default:
                elementCircle.style.display = 'block';
                elementRectangle.style.display = 'none';
                elementImgSuccess.style.display = 'none';
                elementImgError.style.display = 'none';

                elementImgWaterBottleBig.style.transform = `rotate(0deg)`;
                elementImgWaterBottleBig.style.top = `13%`;
                elementImgWaterBottleBig.style.left = `18%`;
                break;
        }

    }, [objectRecognitionState]);


    useEffect(() => {
        const timeoutInterval = 2000;

        const interval = setInterval(() => {
            getState();
        }, timeoutInterval);

        return () => clearInterval(interval);
    }, []);

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