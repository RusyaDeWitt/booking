import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Matchs } from '../api/matchs.js';
import Match from './Match.js';
import Navigation from './Navigation';



class MatchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionRounds: "Select Place",
      selectedOptionTimes: "Select Time",
    }
  };


  handleSelectTime(event) {
    this.setState({ selectedOptionTimes: event });
  }

  handleSelectRound(event) {
    this.setState({ selectedOptionRounds: event });
  }
  OnehandleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const scoredOne = ReactDOM.findDOMNode(this.refs.ScoredOne).value.trim();
    const scoredTwo = ReactDOM.findDOMNode(this.refs.ScoredTwo).value.trim();
    const day = ReactDOM.findDOMNode(this.refs.Day).value.trim();

    const round = this.state.selectedOptionRounds;
    const time = this.state.selectedOptionTimes;

    Meteor.call('matchs.insert', scoredOne , scoredTwo, round, time , day);

    // Clear form
 ReactDOM.findDOMNode(this.refs.ScoredOne).value = '';
 ReactDOM.findDOMNode(this.refs.ScoredTwo).value= '';
 ReactDOM.findDOMNode(this.refs.Day).value ='';
}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
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
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    const round = this.props.matchs.map((match) => match.round)
    const {selectedOption} = this.state;
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
            { this.props.currentUser ?
              <div className="TeamAllForms">
                <center>
                  <h1>Reserve</h1>

                    <div className="dropdown-round">
                    <h4>Select Place</h4>
                     <DropdownButton className="dropdownbutton-team1"
                          title={this.state.selectedOptionRounds}
                          id="document-type"
                          onSelect={this.handleSelectRound.bind(this)}
                        >
                            <MenuItem eventKey={'Pool'}>
                              Pool
                            </MenuItem>
                            <MenuItem eventKey={'Football'}>
                              Football
                            </MenuItem>
                              <MenuItem eventKey={'Basketball'}>
                              Basketball
                            </MenuItem>
                        </DropdownButton>
                        </div>


                        <div className="dropdown-round">
                        <h4>Select Time</h4>
                         <DropdownButton className="dropdownbutton-team1"
                              title={this.state.selectedOptionTimes}
                              id="document-type"
                              onSelect={this.handleSelectTime.bind(this)}
                            >
                                <MenuItem eventKey={'14:30'}>
                                  14:30
                                </MenuItem>
                                <MenuItem eventKey={'16:50'}>
                                  16:50
                                </MenuItem>
                                  <MenuItem eventKey={'25:20'}>
                                  25:20
                                </MenuItem>
                            </DropdownButton>
                            </div>

                            <div className="dropdown-team1">
                              <h4>Date (Day/Month/Year)</h4>
                                <p></p>
                                <form>
                                  <input className="input-TeamOne"
                                    type="text"
                                    ref="Day"
                                    placeholder=" "
                                    align="left"
                                  />
                                </form>
                            </div>



                    <div className="dropdown-team1">
                      <h4>Name and Surname</h4>
                        <p></p>
                        <form>
                          <input className="input-TeamOne"
                            type="text"
                            ref="ScoredOne"
                            placeholder=" "
                            align="left"
                          />
                        </form>
                    </div>

                    <div className="dropdown-team2">
                      <h4>Phone Number</h4>
                        <p></p>
                        <form>
                          <input className="input-TeamTwo"
                            type="text"
                            ref="ScoredTwo"
                            placeholder= " "
                            align="right"
                          />
                        </form>
                    </div>
                    <p></p>
                    <Button bsStyle="warning" className="dropdown-submit-button" onClick={this.OnehandleSubmit.bind(this)}>Confirm & Submit</Button>
                </center>
                <p></p>
              </div>
              : '' }
            <p></p>
            <Table bordered condensed>
              <thead>
                <tr>
                  <td><strong>Place</strong></td>
                  <td><strong>Time</strong></td>
                  <td><strong>Day</strong></td>
                  <td><strong>Name and Surname</strong></td>
                  <td><strong>Phone Number</strong></td>
                  <td><strong> EDIT </strong></td>
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

})(MatchInput);
