import React, { Component } from 'react';

import historyModule from './historyModule.js'

class Child extends Component {
  state={
    childCounter: 0
  }

  increaseChildCounter = () => {
    this.setState((prevState) => {
      return { childCounter: prevState.childCounter + 1 };
    })
  }

  componentDidMount() {
    historyModule.add({ method:'componentDidMount', target:'Child' })
    /**
     * Uncomment the line below to update the state
     * It will re-render the component after `componentDidMount`
     * but `componentDidMount` itself will not called again
     */
    // this.increaseChildCounter()
  }

  componentWillUnmount() {
   historyModule.add({ method:'componentWillUnmount', target:`Child` })
   /**
   * Uncomment the line below to update the state
   * It will NOT re-render the component after `componentWillUnmount`
   * And `componentWillUnmount()` itself will not called again
   */
   // this.increaseChildCounter()
  }

  render() {
    historyModule.add({ method:'render', target:'Child' })

    return (
      <div className='child'>
      <h2>Child</h2>
      <h4>Child Counter = {this.state.childCounter}</h4>
      <button
        className='btn green'
        onClick={this.increaseChildCounter}
      >
        Increase
      </button>
      </div>
    );
  }
}

export default Child;
