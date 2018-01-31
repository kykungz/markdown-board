import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'github-markdown-css/github-markdown.css'
import 'font-awesome/css/font-awesome.css'
import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    background: rgb(35, 44, 47);
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
