import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix , Table ,Modal} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link , Switch } from "react-router-dom";
import Match from '../MatchPublic/MatchPublic.js'
import { Matchs } from '../../api/matchs/matchs.js';


class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }
  renderMatchs() {
    let filteredMatchs = this.props.matchs;
    if (this.state.hideCompleted) {
      filteredMatchs = filteredMatchs.filter(match => !Match.checked);
    }
    return filteredMatchs.map((match) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = match.owner === currentUserId;

      return (
        <Match
          key={match._id}
          match={match}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }
  OnehandleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const scoredOne = ReactDOM.findDOMNode(this.refs.ScoredOne).value.trim();
    const scoredTwo = ReactDOM.findDOMNode(this.refs.ScoredTwo).value.trim();
    const day = ReactDOM.findDOMNode(this.refs.Day).value.trim();

    const round = this.state.selectedOptionRounds;
    const time = this.state.selectedOptionTimes;
    const timeTwo = this.state.selectedOptionTimesTwo;

    Meteor.call('matchs.insert', scoredOne , scoredTwo, round, time , timeTwo , day);

    // Clear form
 ReactDOM.findDOMNode(this.refs.ScoredOne).value = '';
 ReactDOM.findDOMNode(this.refs.ScoredTwo).value= '';
 ReactDOM.findDOMNode(this.refs.Day).value ='';
}
  render(){
    return(
          <div>
            <Grid>
              <Row>
                <Col md={12}>
                <Table bordered condensed>
                  <thead>
                    <tr>
                      <td><strong>Place</strong></td>
                      <td><strong>Time</strong></td>
                      <td><strong>Day</strong></td>
                      <td><strong>Name and Surname</strong></td>
                      <td><strong>Phone Number</strong></td>
                    </tr>
                  </thead>
                  <tbody>
                      {this.renderMatchs()}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Grid>

        </div>

        );
      }
    }

    export default withTracker(() => {
      Meteor.subscribe('matchs');
      return {
        matchs: Matchs.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Matchs.find({ checked: { $ne: false } }).count(),
        currentUser: Meteor.user(),
      };

    })(HomePage);
