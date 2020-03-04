import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserDetails from './components/userData/userDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/userdetails' component={UserDetails} />
        <Route path='/' component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
