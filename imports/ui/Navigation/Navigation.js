import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';


import '../../startup/Accounts-config/accounts-config'
import LoggedNavigation from '../LoggedNavigation/LoggedNavigation';
import PublicNavigation from '../PublicNavigation/PublicNavigation';
import Matchs from '../../api/matchs/matchs';
import AccountsUIWrapper from '../AccountsUIWrapper/AccountsUIWrapper.js';
import './Navigation.css';

class Navigation extends Component {
  render(){
    return(
  <Navbar>
  <Navbar.Header>
      <Navbar.Brand>
        <Link to="/" className="Project">HomePage</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
    { this.props.currentUser ? <LoggedNavigation/> : <PublicNavigation/> }
    </Navbar.Collapse>
  </Navbar>
);
};
};
export default withTracker(() => {
  Meteor.subscribe('matchs');
  return {
    currentUser: Meteor.user(),
  };
})(Navigation);
