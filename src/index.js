import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { injectGlobal } from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css'
import 'github-markdown-css/github-markdown.css'
import 'font-awesome/css/font-awesome.css'
import 'highlightjs/styles/atom-one-dark.css'
import 'codemirror/lib/codemirror.css'

injectGlobal`
  body {
    background: #2d2d2d;
  }

  .CodeMirror {
    border: 1px solid #eee;
    height: auto;
  }

  .hljs-pre {
    background: rgb(40, 43, 50) !important;
  }

  .page-content {
    margin-left: 200px;
    padding: 40px 1em;
    transition: all 200ms;
  }

  @media (max-width: 768px) {
    .sidebar {
      left: -200px;
    }

    .page-content {
      margin-left: 0;
    }
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
