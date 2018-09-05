import React, { Component } from 'react';

import Parent from './Parent.js'
import History from './History'
import historyModule from './historyModule.js'


import'./style.css'

class App extends Component {
  state = {
    history: []
  }
  handle = (newItem) => {
    this.setState({
      history: newItem
    })
  }

  render() {
    historyModule.add({ method:'render', target:'App' })

    return (
      <div className="App">
      <h3>Stage-2</h3>
      <Parent />
      <History />
      </div>
    );
  }
}

export default App;
