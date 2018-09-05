import React, { Component } from 'react';

import Parent from './Parent.js'
import History from './History'
import historyModule from './historyModule.js'


import'./style.css'

class App extends Component {
  state = {
    history: []
  }

  componentDidMount() {
    historyModule.add({ method:'componentDidMount', target:'App' })
  }

  componentWillUnmount() {
   historyModule.add({ method:'componentWillUnmount', target:`App` })
  }

  render() {
    historyModule.add({ method:'render', target:'App' })

    return (
      <div className="App">
      <h3>Stage-4</h3>
      <Parent />
      <History />
      </div>
    );
  }
}

export default App;
