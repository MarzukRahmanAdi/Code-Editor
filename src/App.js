import React, { useState, useEffect } from 'react';
import Editor from './components/Editor'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  const [isOpen, setIsOpen] = useState()
  const [ready, setReady] = useState()
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
    const firstTime = localStorage.getItem("many")
    if(!firstTime){
      localStorage.setItem("many" , true)
    }
    // console.log(window.innerWidth)

    if(window.innerWidth < 801){
      console.log(window.innerWidth)
      setIsOpen(false)
      setReady(true)
      console.log(isOpen);
    } else {
      setIsOpen(true)
      setReady(true)
      console.log(isOpen);

    }
    if (!firstTime) {
    setHtml(`<h1>You will see output here <h1>`)
    setCss(`@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
     
body{
    background-color:#f0fffe;
    font-family: 'Open Sans', sans-serif;
    text-align:center;
}

      `)
    }
  }, [])

  return (
    <>
      <div className="panel top_panel">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
          isOpen={true}
        />
        {ready && <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
          isOpen={isOpen}
        />}
        {ready && <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
          isOpen={isOpen}
        />}
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
      <p className="footer"> <a href='https://iamadi.xyz/' target="_blank" rel="noopener noreferrer" > <img className='footerimg' src="/adi.png" alt="" /> </a> </p>
      </>
  )
}

export default App;
