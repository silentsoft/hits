import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="*" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
