import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from './appTheme.js';

import './App.scss';
import './Mixins.scss';

class App extends Component {
  render() {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
          <div>
            {this.props.children}
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
