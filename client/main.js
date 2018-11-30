import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import './main.html'

import '../imports/startup/Accounts-config/accounts-config.js';
import App from '../imports/ui/App/App.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
