import React from 'react';
import './App.css';
import Home from './layouts/Home'
import EventPerCategory from './layouts/EventPerCategory'
import DetailEvent from './layouts/DetailEvent'
import Profile from './layouts/Profile'
import Payments from './layouts/Payments'
import AddEvent from './layouts/AddEvent'
import MyTickets from './layouts/MyTickets'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/category/:id/events" component={EventPerCategory} />
          <Route exact path="/event/:id" component={DetailEvent} />
          <Route exact path="/user/:id" component={Profile} />
          <Route exact path="/payment/:id" component={Payments} />
          <Route exact path="/add_event" component={AddEvent} />
          <Route exact path="/my_tickets/:id" component={MyTickets} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
