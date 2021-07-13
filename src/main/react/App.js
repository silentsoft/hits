import React from 'react';

import './App.css';
import Terminal from './Terminal';

function App() {
  const [ theme, setTheme ] = React.useState('dark')
  const themeVars = theme === 'dark' ? {
    app: {backgroundColor: '#333444'},
    terminal: {boxShadow: '0 2px 5px #111'},
    window: {backgroundColor: '#222345', color: '#F4F4F4'},
    field: {backgroundColor: '#222333', color: '#F4F4F4', fontWeight: 'normal'},
    cursor: {animation : '1.02s blink-dark step-end infinite'}
  } : {
    app: {backgroundColor: '#ACA9BB'},
    terminal: {boxShadow: '0 2px 5px #33333375'},
    window: {backgroundColor: '#5F5C6D', color: '#E3E3E3'},
    field: {backgroundColor: '#E3E3E3', color: '#474554', fontWeight: 'bold'},
    cursor: {animation : '1.02s blink-light step-end infinite'}
  }

  return <div id="app" style={themeVars.app}>
    <Terminal theme={themeVars} setTheme={setTheme}/>
  </div>
}

export default App;
