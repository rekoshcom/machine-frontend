import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/img/logo.png';

const Navbar = () => {
    const location = useLocation();

    return (
        <aside class="menu">
            <div class="logo">
                <img src={logo} width="50"/>
            </div>
            <ul class="menu-list">
                <li>
                    <Link
                        to={`/`}
                        id="target"
                        className={`navbar-item ${
                            location.pathname === '/'
                            ? 'is-active'
                            : ''
                        }`}
                    >
                        Target
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/settings`}
                        id="settings`"
                        className={`navbar-item ${
                            location.pathname === '/settings`'
                            ? 'is-active'
                            : ''
                        }`}
                    >
                        Settings
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Navbar;