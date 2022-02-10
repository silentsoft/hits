import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Terminal from "./terminal/Terminal";

ReactDOM.render(
    <React.StrictMode>
        <div className="flex h-screen">
            <div className="w-full h-full">
                <div className="h-screen" style={{minHeight: "fit-content"}}>
                    <Header/>
                    <Content/>
                    <div className="sm:hidden">
                        <Footer/>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <Terminal/>
                </div>
            </div>
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);
