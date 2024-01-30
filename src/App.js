import React from "react";
import Favicon from "react-favicon";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './components';
import { Target, Info, Recycle, Settings } from './views';

import { StateContextProvider } from './context';
import faviconImg from './assets/img/favicon.png';

import './assets/css/styles.css';

const App = () => {
  return (
    <BrowserRouter>
        <div className="App h-100vh">
            <StateContextProvider>
                <Favicon url={faviconImg}></Favicon>

                <div className="columns m-0 h-100p">
                    <div className="column is-1.5 sidebar">
                        <Navbar />
                    </div>
                    <div className="column is-5.5 area-data">
                        <Routes>
                            <Route exact path="/" element={<Target />} />
                            <Route exact path="/info" element={<Info />} />
                            <Route exact path="/settings" element={<Settings />} />
                        </Routes>
                    </div>
                    <div className="column is-5 area-action">
                        <Recycle />
                    </div>
                </div>
            </StateContextProvider>
        </div>
    </BrowserRouter>
  );
}

export default App;
