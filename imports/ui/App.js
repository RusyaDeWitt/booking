import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix , Table ,Modal} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link , Switch } from "react-router-dom";

import MatchInput from './matchInput.js'
import AccountsUIWrapper from './AccountsUIWrapper.js';
// import StudentsListInfo from './StudentsListInfo.js'
import Navigation from './Navigation.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  render(){
    return (
      <Router>
        <div>
          <Navigation />
            <Switch>
              <Route exact path="/" component={MatchInput} />
            </Switch>
        </div>
      </Router>
    );
 };
}
export default App;
