import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import MatchInputPublic from '../MatchPublic/MatchInputPublic.js'

import AccountsUIWrapper from '../AccountsUIWrapper/AccountsUIWrapper.js';
import './PublicNavigation.css';

const PublicNavigation = () => (
      <Nav pullRight className="nav_right">
      <LinkContainer to ="/Public">
       <NavItem eventKey={1}>
        Забронировать
      </NavItem>
      </LinkContainer>
        <NavItem eventKey={2}>
          <AccountsUIWrapper />
        </NavItem>
      </Nav>
)
export default PublicNavigation
