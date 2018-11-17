import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

import AccountsUIWrapper from './AccountsUIWrapper.js';
import './Navigation.css';

const Navigation = () => (
  <Navbar>
  <Navbar.Header>
      <Navbar.Brand>
        <Link to="/" className="Project">Book</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight className="nav_right">
        <NavItem eventKey={1}>
          <AccountsUIWrapper />
        </NavItem>
        <NavItem eventKey={2} >
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
export default Navigation
