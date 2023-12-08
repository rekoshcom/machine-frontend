import React from 'react';

import { useStateContext } from '../context';

import imgDataBio from '../assets/img/data-bio.png';
import imgWaterBottle from '../assets/img/water-bottle.png';
import imgDataBalance from '../assets/img/data-balance.png';
import imgDataMoneyBag from '../assets/img/data-money-bag.png';

const Target = () => {
    const stateContext = useStateContext();

    return (
        <div className="container is-flex is-flex-direction-column h-100vh">
            <div className="columns is-vcentered is-centered m-0 mt-6">
                <div className="meter position-relative">
                    <ul className="progress-of-collected-percentage">
                        <li>
                            <span></span>
                        </li>
                        <li id="rotating-element">
                            <span></span>
                        </li>
                        <li>
                            <span></span>
                        </li>
                        <li>
                            <span></span>
                        </li>
                    </ul>

                    <div className="label-container">
                        <label className="lebel-left">0%</label>
                        <label className="label-right">
                            {
                                stateContext.state !== null
                                ? <span>{stateContext.state.remaining_in_percentage}%</span>
                                : <span>0%</span>
                            }
                        </label>
                    </div>

                    <div className="meter-hand" id="meter-hand"></div>
                </div>
            </div>

            <div className="columns data-top ml-0 mr-0 mb-4 px-2 py-1">
                <div className="column has-text-centered p-0">
                    <div className="columns mt-2 is-flex is-vcentered mb-0">
                        <div className="column is-4 has-text-right">
                            <span>
                                <img src={imgWaterBottle} alt="Bottle of water"/>
                            </span>
                        </div>
                        <div className="column is-8 has-text-left title">
                            {
                                stateContext.state !== null
                                ? <span>{stateContext.state.collected.items}</span>
                                : <span></span>
                            }
                        </div>
                    </div>

                    <span>остават {
                        stateContext.state !== null
                        ? <span>{stateContext.state.remaining}</span>
                        : <span>___</span>
                    }</span>
                </div>
            </div>
            <div className="columns data-bottom mt-auto ml-0 mr-0 mb-0 px-2 py-1">
                <div className="column">
                    <span>Еко влияние</span>

                    <div className="columns mt-2 is-flex is-vcentered">
                        <div className="column is-2">
                            <img src={imgDataBio} alt="icon bio"/>
                        </div>
                        <div className="column is-10">
                            {
                                stateContext.state !== null
                                ? <span>{stateContext.state.eco_influence.amount} {stateContext.state.eco_influence.unit}</span>
                                : <span>___ kWh</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns data-bottom mt-auto ml-0 mr-0 mb-0 px-2 py-1">
                <div className="column">
                    <span>Събрани количества</span>

                    <div className="columns mt-2 is-flex is-vcentered">
                        <div className="column is-2">
                            <img src={imgDataBalance} alt="data balance"/>
                        </div>
                        <div className="column is-4">
                            {
                                stateContext.state !== null
                                ? <span>{stateContext.state.collected.weight.amount} {stateContext.state.collected.weight.unit}</span>
                                : <span>___ кг.</span>
                            }
                        </div>
                        <div className="column is-2">
                            <img src={imgDataMoneyBag} alt="Data a bag of money"/>
                        </div>
                        <div className="column is-4">
                            {
                                stateContext.state !== null
                                ? <span>{stateContext.state.collected.finances.amount} {stateContext.state.collected.finances.unit}</span>
                                : <span>___ лв.</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Target;