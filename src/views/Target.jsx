import React from 'react';
import { Link } from 'react-router-dom';

import { useStateContext } from '../context';

import { ReactComponent as SvgCoins } from '../assets/svg/svgCoins.svg';
import { ReactComponent as SvgSetting } from '../assets/svg/svgSetting.svg';
import { ReactComponent as SvgRecycle } from '../assets/svg/svgRecycle.svg';
import { ReactComponent as SvgBottlePet } from '../assets/svg/svgBottlePet.svg';
import { ReactComponent as SvgPlantLamp } from '../assets/svg/svgPlantLamp.svg';
import { ReactComponent as SvgConnected } from '../assets/svg/svgConnected.svg';
import { ReactComponent as SvgDisconnected } from '../assets/svg/svgDisconnected.svg';
import { ReactComponent as SvgCarbonDioxide } from '../assets/svg/svgCarbonDioxide.svg';

const Target = () => {
    const stateContext = useStateContext();

    return (
        <div className="container is-flex is-flex-direction-column h-100vh">
            <div className="columns is-vcentered is-centered mx-0 mt-5 mb-4">
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

                    <div className="meter-data has-text-centered">
                        <div className="data-top">
                            <SvgBottlePet className="icon-standard-large mb-0" />
                            <div className="title mb-0">
                                {
                                    stateContext.state !== null
                                    ? <span>{stateContext.state.collected.items}</span>
                                    : <span></span>
                                }
                            </div>
                            <span className="subtitle">остават {
                                stateContext.state !== null
                                ? <span>{stateContext.state.remaining}</span>
                                : <span>___</span>
                            }</span>                        
                        </div>       
                    </div>       
                    {/* <div className="meter-hand" id="meter-hand"></div> */}
                </div>
            </div>    
            <div className="columns m-0 pl-3 pr-4">
                <div className="column data-bottom is-6 mr-1">     
                    <div className="columns is-flex is-vcentered">
                        <div className="column is-4">
                            <SvgCoins className="icon-standard"/>
                        </div>
                        <div className="column is-8">
                            {
                                stateContext.state !== null
                                ? <span>
                                    <strong>{stateContext.state.collected.finances.amount}</strong> {stateContext.state.collected.finances.unit}
                                </span>
                                : <span>___ лв.</span>
                            }
                        </div>
                    </div>
                </div>
                
                <div className="column data-bottom is-6">                    
                    <div className="columns is-flex is-vcentered">
                        <div className="column is-4">
                            <SvgRecycle className="icon-standard"/>
                        </div>
                        <div className="column is-8">
                            {
                                stateContext.state !== null
                                ? <span>
                                    <strong>{stateContext.state.collected.weight.amount}</strong> {stateContext.state.collected.weight.unit}
                                </span>
                                : <span>___ кг.</span>
                            }
                        </div>                        
                    </div>
                </div>                
            </div>
            <div className="columns m-0 mt-1 pl-3 pr-4">
                <div className="column data-bottom is-6 mr-1">                    
                    <div className="columns is-flex is-vcentered">
                        <div className="column is-4">
                            <SvgPlantLamp className="icon-standard"/>
                        </div>
                        <div className="column is-8">
                            {
                                stateContext.state !== null
                                ? <span>
                                    <strong>{stateContext.state.eco_influence.energy.amount}</strong> {stateContext.state.eco_influence.energy.unit}
                                </span>
                                : <span>___ kWh</span>
                            }
                        </div>
                    </div>
                </div>

                <div className="column data-bottom is-6">                    
                    <div className="columns is-flex is-vcentered">
                        <div className="column is-4">
                            <SvgCarbonDioxide className="icon-standard"/>                            
                        </div>
                        <div className="column is-8">
                            {
                                stateContext.state !== null
                                ? <span>
                                    <strong>{stateContext.state.eco_influence.cotwo.amount}</strong> {stateContext.state.eco_influence.cotwo.unit}
                                </span>
                                : <span>___ kWh</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns m-0 mt-6 pl-3 pr-4">
                <div className="column is-12">                    
                    <div className="columns is-flex">
                        <div className="column is-6 has-text-centered">
                            {
                                stateContext.state !== null && stateContext.state.is_connected
                                ? <SvgConnected className="icon-connected mr-5"/> 
                                : <SvgDisconnected className="icon-disconnected mr-5"/> 
                            }

                            {
                                stateContext.state !== null && stateContext.state.error.status
                                ? <Link to={`/settings`} >                         
                                    <SvgSetting className="icon-error"/>
                                </Link>
                                : <SvgSetting className="icon-no-error"/>
                            }
                        </div>
                        <div className="column is-6"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Target;