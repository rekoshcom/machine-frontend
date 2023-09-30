import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './components';
import { Target, Settings, Recycle } from './views';

import './assets/css/styles.css';

const App = () => {
  return (
    <BrowserRouter>
        <div className="App">
            <div class="columns">
                <div class="column is-1">
                    <Navbar />
                </div>
                <div class="column is-6">
                    <Routes>
                        <Route exact path="/" element={<Target />} />
                        <Route exact path="/settings" element={<Settings />} />
                    </Routes>
                </div>
                <div class="column is-5">
                    <Recycle />
                </div>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
