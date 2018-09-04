# react-lifecycle walk-through workshop:

## installation:
```bash
  $ git clone git@github.com:RamyAlshurafa/react-lifecycle.git
  $ cd react-lifecycle
```
 This workshop will divided into stages:
## Stage-0 => Base stage:
```bash
$ npm i
$ npm run start:stage-0
```

This stage contains the core file structure required for next stages.


```bash
stage-0
   ├── public
   │    ├── favicon.ico
   │    ├── index.html
   │    └── manifest.json
   │
   ├── src
   │    ├── Component
   │    │     ├── App.js
   │    │     ├── Parent.js
   │    │     ├── Child.js
   │    │     └── style.css
   │    │         
   │    ├── index.js
   │    └── registerServiceWorker.js
   │
   ├── package-lock.json
   └── package.json
```
## Stage-1 => `Logger`:
```bash
$ npm i
$ npm run start:stage-1
```

In this stage we will add logging functions to log every event occurs under hook and show the event target and event type
So we will create `historyModule.js`
```js
function historyModule () {
  // array of events that occurred
  var history = []

  /**
   * function to update the history list
   * can accessed from another components
   * once we call it it will re-render the
   * History component
   * why? because we won't update App state
   */
  var callback

  // Add new event to the history array
  function add (item) {
    history.push(item);
    if (typeof callback === 'function')
    /**
     * after updating the history array
     * re-render the History component
     */
      callback()
  }

  /**
   * get re-rendering function and put it
   * in callback variable
   */
  function updater (cb) {
    callback = cb
  }

  // return the history array
  function get () {
    return history
  }

  // Clear history array
  function clear () {
    history = []
    if (typeof callback === 'function')
    /**
     * after clearing the history array
     * re-render the History component
     */
      callback()
  }

  return {
    add,
    updater,
    get,
    clear,
  };
}

export default historyModule()
```

Create `History/index.js`
```js
import React, { Component } from 'react';

import HistoryLogger from './HistoryLogger'
import historyModule from './../historyModule.js'

class History extends Component {
  constructor(props) {
  super(props);
  this.updateHistory = this.updateHistory.bind(this);
}

state = {
  historyArray: 0
}

updateHistory () {
  /**
   * Update the History component's state
   * So it will re-render everytime we call it
   */
  this.setState((prevState) => {
    return { historyArray: prevState.historyArray + 1 };
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
          {/* clearing the history array */}
          onClick={()=>historyModule.clear()}
        >
        Clear
      </button>
      </div>
    )
  }
}

export default History;
```
Create `History/HistoryLogger.js`
```js
import React, { Component } from 'react';

const HistoryLogger = (props) => {
    return (
      <div className="historyLogger">
      {/* Iterate though the historyArray and rendering*/}
      {props.historyArray.map((element, index)=> <h4>{element.method} ==>> {element.target}</h4>)}
      </div>
    )
  }

export default HistoryLogger;

```
