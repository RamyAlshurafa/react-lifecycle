import React, { Component } from 'react';

import HistoryLogger from './HistoryLogger'
import historyModule from './../historyModule.js'

class History extends Component {
  constructor(props) {
  super(props);
  this.updateHistory = this.updateHistory.bind(this);
}

state = {
  historyCounter: 0
}

updateHistory () {
  /**
   * Update the History component's state
   * So it will re-render everytime we call it
   */
  this.setState((prevState) => {
    return { historyCounter: prevState.historyCounter + 1 };
  })
}

  render() {
    /**
    * passing updateHistory to our module so we can
    * access it wherever we call our module
    */
    historyModule.updater(this.updateHistory)

    return (
      <div className="history">
      <h3>Events history</h3>
        <HistoryLogger
            historyArray = {historyModule.get()}
        />
        <button
          className='btn red'
          onClick={()=>historyModule.clear()}
        >
        Clear
      </button>
      </div>
    )
  }
}

export default History;
