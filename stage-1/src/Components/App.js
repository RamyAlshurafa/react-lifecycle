import React, { Component } from 'react';

import Parent from './Parent.js'
import History from './History'

import'./style.css'

class App extends Component {
  state = {
    history: []
  }

  render() {

    return (
      <div className="App">
      <h3>Stage-1</h3>
      <Parent />
      <History />
      </div>
    );
  }
}

export default App;
