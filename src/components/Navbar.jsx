import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/img/logo.png';

import { ReactComponent as SvgInfo } from '../assets/svg/svgInfo.svg';
import { ReactComponent as SvgTarget } from '../assets/svg/svgTarget.svg';
import { ReactComponent as SvgSettings } from '../assets/svg/svgSettings.svg';

const Navbar = () => {
    const location = useLocation();

    return (
        <aside className="menu">
            <div className="logo">
                <img src={logo} alt="Logo of ReKosh"/>
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
                        <SvgTarget className={`w-4 h-4 ${
                            location.pathname === '/'
                            ? 'icon-menu-active'
                            : 'icon-menu-inactive'
                        }`}/>
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/info`}
                        id="info`"
                        className={`navbar-item has-text-centered ${
                            location.pathname === '/info'
                            ? 'is-active'
                            : ''
                        }`}
                    >
                        <SvgInfo className={`w-4 h-4 ${
                            location.pathname === '/info'
                            ? 'icon-menu-active'
                            : 'icon-menu-inactive'
                        }`}/>
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/settings`}
                        id="settings`"
                        className={`navbar-item has-text-centered ${
                            location.pathname === '/settings'
                            ? 'is-active'
                            : ''
                        }`}
                    >
                        <SvgSettings className={`w-4 h-4 ${
                            location.pathname === '/settings'
                            ? 'icon-menu-active'
                            : 'icon-menu-inactive'
                        }`}/>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Navbar;