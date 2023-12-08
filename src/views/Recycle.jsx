import React from 'react';

import { useStateContext } from '../context';

import imgError from '../assets/img/error.png';
import imgSuccess from '../assets/img/success.png';
import imgWaterBottleBig from '../assets/img/water-bottle-big.png';

const Recycle = () => {
    const stateContext = useStateContext();

    return (
        <div className="container is-flex is-flex-direction-column h-96vh">
            <div className="content has-text-centered">
                <div id="circle"></div>
                <div id="rectangle"></div>

                <img id="imgWaterBottleBig" src={imgWaterBottleBig} />
                <img id="imgSuccess" src={imgSuccess} />
                <img id="imgError" src={imgError} />
            </div>
            <div className="content has-text-centered mt-auto pb-6">
                {
                    stateContext.state !== null
                    ? <h1>
                        {
                            'NOT_INSERTED' === stateContext.state.object_recognition_state
                            && <>Вкарай пластмасова бутилка</>
                        }

                        {
                            'INSERTED' === stateContext.state.object_recognition_state
                            && <>Разпознаване на обекта...</>
                        }

                        {
                            'CORRECT_OBJECT' === stateContext.state.object_recognition_state
                            && <>Благодаря!</>
                        }

                        {
                            'INCORRECT_OBJECT' === stateContext.state.object_recognition_state
                            && <>Обектът не е разпознат. Опитайте с друга бутилка.</>
                        }
                    </h1>
                    : <></>
                }
            </div>
        </div>
    );
}

export default Recycle;