import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'github-markdown-css/github-markdown.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
