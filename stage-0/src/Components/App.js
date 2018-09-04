import React, { Component } from 'react';

import Parent from './Parent.js'

import'./style.css'

class App extends Component {

  render() {

    return (
      <div className="App">
      <h3>Stage-0</h3>
      <Parent />
      </div>
    );
  }
}

export default App;
