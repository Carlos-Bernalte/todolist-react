import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import './index.css';


import App from './components/App';
import Home from './components/Home';

ReactDOM.render(<HashRouter>
  <div>
    <Route exact path="/" component={App} />
    <Route path="/home" component={Home} />
  </div>
</HashRouter >, document.getElementById('root'));