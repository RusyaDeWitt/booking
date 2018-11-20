import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';


import { Matchs } from '../api/matchs.js';
// Team component - represents a single todo item
class Match extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionTeamOne: null,
      selectedOptionTeamTwo: null,
    }
  };

  deleteThisMatch() {
    Meteor.call('matchs.remove', this.props.match._id);
  }

  togglePrivateMatch() {
    Meteor.call('matchs.setPrivate', this.props.match._id, ! this.props.match.private);
  }

  render() {

    const teamClassName = classnames({
      checked: this.props.match.checked,
      private: this.props.match.private,
    });


    const {selectedOption} = this.state;

    return (
            <tr>
              <td>{this.props.match.round}</td>
              <td>{this.props.match.time}</td>
              <td><strong>{this.props.match.day}</strong></td>
              <td><strong>{this.props.match.scoredOne}</strong></td>
              <td><strong>{this.props.match.scoredTwo}</strong></td>
              <td>
                { this.props.currentUser ?
                <Button bsStyle="danger" className="delete" onClick={this.deleteThisMatch.bind(this)}>
                  &times;
                </Button>
                : ''
              }
              </td>
            </tr>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('matchs')


  return {
    matchs: Matchs.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Matchs.find({ checked: { $ne: false } }).count(),
    currentUser: Meteor.user(),
  };
})(Match)
