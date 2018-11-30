import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Matchs } from '../../api/matchs/matchs.js';
import Match from './MatchPublic.js';
import Navigation from '../Navigation/Navigation';



class MatchInputPublic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionRounds: "Select Place",
      selectedOptionTimes: "Select Time",
      selectedOptionTimesTwo: "Select Time",
    }
  };

  handleSelectTimeTwo (event) {
    this.setState({ selectedOptionTimesTwo: event });
  }

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
    const timeTwo = this.state.selectedOptionTimesTwo;

    Meteor.call('matchs.insert', scoredOne , scoredTwo, round, time , timeTwo , day);

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
                                <MenuItem eventKey={'9:00'}>
                                  9:00
                                </MenuItem>
                                  <MenuItem eventKey={'9:30'}>
                                  9:30
                                </MenuItem>
                                <MenuItem eventKey={'10:00'}>
                                  10:00
                                </MenuItem>
                                  <MenuItem eventKey={'10:30'}>
                                  10:30
                                </MenuItem>
                                <MenuItem eventKey={'11:00'}>
                                  11:00
                                </MenuItem>
                                <MenuItem eventKey={'11:30'}>
                                  11:30
                                </MenuItem>
                                  <MenuItem eventKey={'12:00'}>
                                  12:00
                                </MenuItem>
                                <MenuItem eventKey={'12:30'}>
                                  12:30
                                </MenuItem>
                                <MenuItem eventKey={'13:00'}>
                                  13:00
                                </MenuItem>
                                  <MenuItem eventKey={'13:30'}>
                                  13:30
                                </MenuItem>
                                <MenuItem eventKey={'14:00'}>
                                  14:00
                                </MenuItem>
                                <MenuItem eventKey={'14:30'}>
                                  14:30
                                </MenuItem>
                                  <MenuItem eventKey={'15:00'}>
                                  15:30
                                </MenuItem>
                                <MenuItem eventKey={'15:30'}>
                                  15:30
                                </MenuItem>
                                <MenuItem eventKey={'16:00'}>
                                  16:00
                                </MenuItem>
                                  <MenuItem eventKey={'16:30'}>
                                  16:30
                                </MenuItem>
                                <MenuItem eventKey={'17:00'}>
                                  17:00
                                </MenuItem>
                                <MenuItem eventKey={'17:30'}>
                                  17:30
                                </MenuItem>
                                  <MenuItem eventKey={'18:00'}>
                                  18:00
                                </MenuItem>
                                <MenuItem eventKey={'18:30'}>
                                  18:30
                                </MenuItem>
                                <MenuItem eventKey={'19:00'}>
                                  19:00
                                </MenuItem>
                                  <MenuItem eventKey={'19:30'}>
                                  19:30
                                </MenuItem>
                                <MenuItem eventKey={'20:00'}>
                                  20:00
                                </MenuItem>
                                <MenuItem eventKey={'20:30'}>
                                  20:30
                                </MenuItem>
                                  <MenuItem eventKey={'21:00'}>
                                  21:00
                                </MenuItem>
                                <MenuItem eventKey={'21:30'}>
                                  21:30
                                </MenuItem>
                                <MenuItem eventKey={'22:00'}>
                                  22:00
                                </MenuItem>
                                  <MenuItem eventKey={'22:30'}>
                                  22:30
                                </MenuItem>
                                <MenuItem eventKey={'23:00'}>
                                  23:00
                                </MenuItem>
                                <MenuItem eventKey={'23:30'}>
                                  23:30
                                </MenuItem>
                                  <MenuItem eventKey={'00:00'}>
                                  00:00
                                </MenuItem>
                            </DropdownButton>
                            </div>

                            <div className="dropdown-round">
                             <DropdownButton className="dropdownbutton-team1"
                                  title={this.state.selectedOptionTimesTwo}
                                  id="document-type"
                                  onSelect={this.handleSelectTimeTwo.bind(this)}
                                >
                                    <MenuItem eventKey={'9:00'}>
                                      9:00
                                    </MenuItem>
                                      <MenuItem eventKey={'9:30'}>
                                      9:30
                                    </MenuItem>
                                    <MenuItem eventKey={'10:00'}>
                                      10:00
                                    </MenuItem>
                                      <MenuItem eventKey={'10:30'}>
                                      10:30
                                    </MenuItem>
                                    <MenuItem eventKey={'11:00'}>
                                      11:00
                                    </MenuItem>
                                    <MenuItem eventKey={'11:30'}>
                                      11:30
                                    </MenuItem>
                                      <MenuItem eventKey={'12:00'}>
                                      12:00
                                    </MenuItem>
                                    <MenuItem eventKey={'12:30'}>
                                      12:30
                                    </MenuItem>
                                    <MenuItem eventKey={'13:00'}>
                                      13:00
                                    </MenuItem>
                                      <MenuItem eventKey={'13:30'}>
                                      13:30
                                    </MenuItem>
                                    <MenuItem eventKey={'14:00'}>
                                      14:00
                                    </MenuItem>
                                    <MenuItem eventKey={'14:30'}>
                                      14:30
                                    </MenuItem>
                                      <MenuItem eventKey={'15:00'}>
                                      15:30
                                    </MenuItem>
                                    <MenuItem eventKey={'15:30'}>
                                      15:30
                                    </MenuItem>
                                    <MenuItem eventKey={'16:00'}>
                                      16:00
                                    </MenuItem>
                                      <MenuItem eventKey={'16:30'}>
                                      16:30
                                    </MenuItem>
                                    <MenuItem eventKey={'17:00'}>
                                      17:00
                                    </MenuItem>
                                    <MenuItem eventKey={'17:30'}>
                                      17:30
                                    </MenuItem>
                                      <MenuItem eventKey={'18:00'}>
                                      18:00
                                    </MenuItem>
                                    <MenuItem eventKey={'18:30'}>
                                      18:30
                                    </MenuItem>
                                    <MenuItem eventKey={'19:00'}>
                                      19:00
                                    </MenuItem>
                                      <MenuItem eventKey={'19:30'}>
                                      19:30
                                    </MenuItem>
                                    <MenuItem eventKey={'20:00'}>
                                      20:00
                                    </MenuItem>
                                    <MenuItem eventKey={'20:30'}>
                                      20:30
                                    </MenuItem>
                                      <MenuItem eventKey={'21:00'}>
                                      21:00
                                    </MenuItem>
                                    <MenuItem eventKey={'21:30'}>
                                      21:30
                                    </MenuItem>
                                    <MenuItem eventKey={'22:00'}>
                                      22:00
                                    </MenuItem>
                                      <MenuItem eventKey={'22:30'}>
                                      22:30
                                    </MenuItem>
                                    <MenuItem eventKey={'23:00'}>
                                      23:00
                                    </MenuItem>
                                    <MenuItem eventKey={'23:30'}>
                                      23:30
                                    </MenuItem>
                                      <MenuItem eventKey={'00:00'}>
                                      00:00
                                    </MenuItem>
                                </DropdownButton>
                                </div>
                      <p></p>
                    <div className="dropdown-team1">
                      <h4>Name and Surname</h4>
                        <p></p>
                        <form>
                          <input className="input"
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
                          <input className="input"
                            type="text"
                            ref="ScoredTwo"
                            placeholder= " "
                            align="right"
                          />
                        </form>
                    </div>
                    <div className="dropdown-team1">
                      <h4>Date (Day/Month/Year)</h4>
                        <p></p>
                        <form>
                          <input className="input"
                            type="text"
                            ref="Day"
                            placeholder=" "
                            align="left"
                          />
                        </form>
                    </div>
                    <p></p>
                    <Button bsStyle="warning" className="dropdown-submit-button" onClick={this.OnehandleSubmit.bind(this)}>Отправить запрос</Button>
                </center>
                <p></p>
              </div>
            <p></p>
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

})(MatchInputPublic);
