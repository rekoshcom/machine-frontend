import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/img/logo.png';

import imgNavbarInfoActive from '../assets/img/navbar-info-active.png';
import imgNavbarInfoInactive from '../assets/img/navbar-info-inactive.png';
import imgNavbarTargetActive from '../assets/img/navbar-target-active.png';
import imgNavbarTargetInactive from '../assets/img/navbar-target-inactive.png';

const Navbar = () => {
    const location = useLocation();

    return (
        <aside className="menu">
            <div className="logo">
                <img src={logo}/>
            </div>
            <ul className="menu-list mt-6">
                <li>
                    <Link
                        to={`/`}
                        id="target"
                        className={`navbar-item has-text-centered ${
                            location.pathname === '/'
                            ? 'is-active'
                            : ''
                        }`}
                    >
                        {
                            location.pathname === '/'
                            ? <img src={imgNavbarTargetActive} className="w-4 h-4"/>
                            : <img src={imgNavbarTargetInactive} className="w-4 h-4" />
                        }
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/info`}
                        id="info`"
                        className={`navbar-item has-text-centered ${
                            location.pathname == '/info'
                            ? 'is-active'
                            : ''
                        }`}
                    >
                        {
                            location.pathname == '/info'
                            ? <img src={imgNavbarInfoActive} className="w-4 h-4" />
                            : <img src={imgNavbarInfoInactive} className="w-4 h-4" />
                        }
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Navbar;