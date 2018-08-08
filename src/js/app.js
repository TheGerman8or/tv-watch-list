import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './pages/home';
import 'normalize.css';
import './app.css';

const App = () => (
  <Router>
    <Route exact path='/' component={Home} />
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
