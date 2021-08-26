import React, { useState, useEffect } from 'react';
import Editor from './components/Editor'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])
  useEffect(() => {
    // if (html === "") {
    setHtml(`<h1>You will see output here <h1>
    <h1>If don't know web dev then, click here to start your journey<h1>
    <a href="https://ionicbyte.com" target="_blank">https://ionicbyte.com</a>  
    `)
    setCss(`@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
     
body{
    background-color:#f0fffe;
    font-family: 'Open Sans', sans-serif;
    text-align:center;
}

      `)
    // }
  }, [])
  return (
    <>
      <div className="panel top_panel">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="panel">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
      <p className="footer"> <img src="/logo3.png" alt="" /></p>
    </>
  )
}

export default App;
