import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import DatePicker from 'react-datepicker'
import MatchInput from './matchInput.js'
import moment from 'moment';

export default class Datepicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      startDate: null,
    }
  };
  handleChange(){

  }
  render(){
    return(
      <div className="datepicker">
      <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="LLL"
            timeCaption="time"
          />
      </div>
    )
  }
}
