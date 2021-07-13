import React from 'react';
import Field from './Field';

function Terminal({theme, setTheme}) {
  const [ maximized, setMaximized ] = React.useState(false)
  const [ title, setTitle ] = React.useState('hits.sh')
  const handleClose = () => (window.location.href = 'https://github.com/silentsoft/hits')
  const handleMinMax = () => {
    setMaximized(!maximized);
    document.querySelector('#field-input').focus()
  }

  return <div id="terminal" style={maximized ? {height: '100vh', width: '100vw', maxWidth: '100vw'} : theme.terminal}>
    <div id="window" style={theme.window}>
      <button className="btn red" onClick={handleClose}/>
      <button id="useless-btn" className="btn yellow"/>
      <button className="btn green" onClick={handleMinMax}/>
      <div id="badge"><img src="/hits.sh.svg"/></div>
      <span id="title" style={{color: theme.window.color}}>{title}</span>
    </div>
    <Field theme={theme} setTheme={setTheme} setTitle={setTitle}/>
  </div>
}

export default Terminal;
