import React, { Component } from 'react';

class Child extends Component {
  state={
    childCounter: 0
  }

  increaseChildCounter = () => {
    this.setState((prevState) => {
      return { childCounter: prevState.childCounter + 1 };
    })
  }

  render() {
    
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
