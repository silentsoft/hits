import React, {useState, useEffect} from 'react';

import './Terminal.css';
import Field from './Field';

export default function Terminal() {
    const [theme, setTheme] = useState('dark');
    const themeVars = theme === 'dark' ? {
        app: {backgroundColor: '#ffffff'},
        terminal: {boxShadow: '0 2px 5px #111'},
        window: {backgroundColor: '#1f1f1f', color: '#F4F4F4'},
        field: {backgroundColor: '#222222', color: '#F4F4F4', fontWeight: 'normal'},
        cursor: {animation : '1.02s blink-dark step-end infinite'}
    } : {
        app: {backgroundColor: '#ACA9BB'},
        terminal: {boxShadow: '0 2px 5px #33333375'},
        window: {backgroundColor: '#5F5C6D', color: '#E3E3E3'},
        field: {backgroundColor: '#E3E3E3', color: '#474554', fontWeight: 'bold'},
        cursor: {animation : '1.02s blink-light step-end infinite'}
    }

    const [title, setTitle] = useState('hits.sh');
    const handleClose = () => {
        window.location.href = 'https://github.com/silentsoft/hits';
    }
    const handleMinimize = () => {
        document.documentElement.scrollTop = 0;
    }
    const handleMaximize = () => {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
        focus();
    }

    const focus = () => {
        document.querySelector('#field-input').focus();
    }

    const scrollHandler = () => {
        if (document.documentElement.scrollTop === document.documentElement.scrollHeight - document.documentElement.clientHeight) {
            focus();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        }
    }, [])

    return (
        <div id="app" style={themeVars.app}>
            <div id="terminal" style={themeVars.terminal}>
                <div id="window" style={themeVars.window}>
                    <button className="btn red" onClick={handleClose}/>
                    <button className="btn yellow" onClick={handleMinimize}/>
                    <button className="btn green" onClick={handleMaximize}/>
                    <div id="badge">
                        <img src={`${process.env.REACT_APP_URI}/hits.sh.svg`}/>
                    </div>
                    <span id="title" style={{color: themeVars.window.color}}>{title}</span>
                </div>
                <Field theme={themeVars} setTheme={setTheme} setTitle={setTitle}/>
            </div>
        </div>
    );
}