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
import Datepicker from './datepicker'


class MatchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionRounds: "Select round",
    }
  };

  handleSelectRound(event) {
    this.setState({ selectedOptionRounds: event });
  }
  OnehandleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const scoredOne = ReactDOM.findDOMNode(this.refs.ScoredOne).value.trim();
    const scoredTwo = ReactDOM.findDOMNode(this.refs.ScoredTwo).value.trim();

    const round = this.state.selectedOptionRounds;

    Meteor.call('matchs.insert', scoredOne , scoredTwo, round);

    // Clear form
 ReactDOM.findDOMNode(this.refs.ScoredOne).value = '';
 ReactDOM.findDOMNode(this.refs.ScoredTwo).value= '';
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
                  <h1>Add Match</h1>
                   <Datepicker />
                    <div className="dropdown-round">
                    <h4>Select Round</h4>
                     <DropdownButton className="dropdownbutton-team1"
                          title={this.state.selectedOptionRounds}
                          id="document-type"
                          onSelect={this.handleSelectRound.bind(this)}
                        >
                            <MenuItem eventKey={'First Round'}>
                              First Round
                            </MenuItem>
                            <MenuItem eventKey={'Second Round'}>
                              Second Round
                            </MenuItem>
                              <MenuItem eventKey={'Third Round'}>
                              Third Round
                            </MenuItem>
                              <MenuItem eventKey={'Quarter-final'}>
                              Quarter-final
                            </MenuItem>
                              <MenuItem eventKey={'Semi-final'}>
                                Semi-final
                            </MenuItem>
                              <MenuItem eventKey={'Final'}>
                                Final
                            </MenuItem>
                        </DropdownButton>
                        </div>

                    <div className="dropdown-team1">
                      <h4>First Team</h4>
                        <p></p>
                        <form>
                          <input className="input-TeamOne"
                            type="text"
                            ref="ScoredOne"
                            placeholder="First Teams Score"
                            align="left"
                          />
                        </form>
                    </div>

                    <div className="dropdown-team2">
                      <h4>Second Team</h4>
                        <p></p>
                        <form>
                          <input className="input-TeamTwo"
                            type="text"
                            ref="ScoredTwo"
                            placeholder= "Second Teams Score"
                            align="right"
                          />
                        </form>
                    </div>
                    <p></p>
                    <Button bsStyle="warning" className="dropdown-submit-button" onClick={this.OnehandleSubmit.bind(this)}>Confirm & Submit</Button>
                </center>
                <p></p>
              </div> : '' }

            <p></p>
            { this.props.currentUser ?
            <Table bordered condensed>
              <thead>
                <tr>
                  <td><strong>Round</strong></td>
                  <td><strong>team1/team2</strong></td>
                  <td><strong> EDIT </strong></td>
                </tr>
              </thead>
              <tbody>
                  {this.renderMatchs()}
              </tbody>
            </Table>
              :
              <span>
              <center>
              <h2 className="authText">Authorize to view this page</h2>
              </center>
              </span>
            }
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
