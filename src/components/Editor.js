import React, { useState } from 'react'
import './Editor.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/xq-dark.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

export default function Editor(props) {
  const {
    language,
    displayName,
    value,
    onChange
  } = props
  const [open, setOpen] = useState(true)

  function handleChange(editor, data, value) {
    onChange(value)
  }

  return (
    <div className={`editor_container ${open ? '' : 'collapsed'}`}>
      <div className="editor_title">
        {displayName}
        <button
          type="button"
          className="expand_btn"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code_container"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'xq-dark',
          lineNumbers: true
        }}
      />
    </div>
  )
}
