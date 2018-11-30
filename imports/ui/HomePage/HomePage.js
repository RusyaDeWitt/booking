import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix , Table ,Modal} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link , Switch } from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }
  render(){
    return(
      <div>
      <h1>Hello</h1>
      </div>
    );
  };
}
