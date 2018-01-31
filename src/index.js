import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { injectGlobal } from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css'
import 'github-markdown-css/github-markdown.css'
import 'font-awesome/css/font-awesome.css'
import 'highlightjs/styles/atom-one-dark.css'

injectGlobal`
  body {
    background: #2d2d2d;
  }

  pre {
    background: rgb(40, 43, 50) !important;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
