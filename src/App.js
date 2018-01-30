import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Admin from './containers/Admin'
import Viewer from './containers/Viewer'

const App = () => (
  <div className='App'>
    <Router>
      <Fragment>
        <Route exact path='/' component={Viewer} />
        <Route path='/admin' component={Admin} />
      </Fragment>
    </Router>
  </div>
)

export default App
