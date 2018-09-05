import React, { Component } from 'react';

import Child from './Child.js'
import historyModule from './historyModule.js'

class Parent extends Component {
  state={
    showChild: false,
    parentCounter: 0
  }

  toggleShowingChild= () => {
    this.setState((prevState) => {
      return { showChild: !prevState.showChild };
    })
  }

  increaseParentCounter = () => {
    this.setState((prevState) => {
      return { parentCounter: prevState.parentCounter + 1 };
    })
  }

  componentDidMount() {
    historyModule.add({ method:'componentDidMount', target:'Parent' })
  }

  componentWillUnmount() {
    historyModule.add({ method:'componentWillUnmount', target:`Parent` })
  }

  render() {
    historyModule.add({ method:'render', target:'Parent' })

    return (
      <div className='parent'>
      <h1>Parent</h1>
      <h4>Parent Counter = {this.state.parentCounter}</h4>
      <button
        className='btn blue'
        onClick={this.increaseParentCounter}
      >
        Increase
      </button>
      <button
        className='btn red'
        onClick={this.toggleShowingChild}
      >
        {this.state.showChild ? 'Hide' : 'Show'}
      </button>
      {this.state.showChild ? <Child /> : null}
      </div>
    );
  }
}

export default Parent;
