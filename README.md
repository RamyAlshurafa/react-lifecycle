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
Watch out some points:
  *  when you increase the `Parent` counter (Change it's state) it will not affect the `Child counter`.
  * when you increase the `Child` counter (Change it's state) it will not affect the `Parent counter`.
  * when you hide the `Child` component and Show it again the `Child counter` will rested.

## Stage-1 => `Logger`:
```bash
$ npm i
$ npm run start:stage-1
```

In this stage we will add logging component to log every event occurs under hook and show the event target and event type.
We need to append this component into `App` and we make some manipulation on it, but we won't to change or touch `App state`.

How will we make this ? we need to create a module that let us to store, get and clear it.
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

## Stage-2 => `render()`:
```bash
$ npm i
$ npm run start:stage-2
```
#### `render()`
> The render() function should be pure, meaning that it does not modify component state, it returns the same result each time it’s invoked, and it does not directly interact with the browser...

> A re-render can only be triggered if a component’s state has changed. The state can change from a props change, or from a direct **setState** change.

When the component re-rendering?
 * Component changed => re-render.
 * Parent changed => re-render.
 * Section of props that doesn't actually impact the view changed => re-render.

#### Caution!
 > Don't put any functions that affect the state inside `render()` method, this will cause infinite loop.

 Now we will add our module inside the `render()` method for `App`, `Parent` and `Child`.

 ```bash
 // In App

 render(){
   historyModule.add({ method:'render', target:'App' });

 // In Parent

 render(){
   historyModule.add({ method:'render', target:'Parent' });

 // In Child
 render(){
   historyModule.add({ method:'render', target:'Child' });

 ```

The result will be showed in the `History` component.

###### Watch out some points:
* At first the we will see that `App` and `Parent` components will rendered.
* Showing child component will re-render `Parent` and `Child` components, this because we change the `Parent` state.
* Hiding `Child` component will re-render `Parent` component only, because we didn't change `App` state.
* Increasing `Parent` counter will re-render `Parent` and `Child`, note that the `Child` counter will not change even though the `Child` component re-rendered.
* Increasing `Child` counter component will re-render `Child` only, because we didn't change any of `Parent` or `App` states.
## Stage-3 => `componentDidMount()`:
```bash
$ npm i
$ npm run start:stage-3
```

> componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

> This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in componentWillUnmount().

Now we will add our module inside the `class` for `App`, `Parent` and `Child`.

```js
componentDidMount() {
 historyModule.add({ method:'componentDidMount', target:App or Parent or Child })
}
```
Watch out some points:
* `componentDidMount` occured after `render` the components.
* When we show the `Child` component it will render the `Child` then `componentDidMount` will be call.
* If the component is visible and the state changed `componentDidMount` will not occurs.  

##### `componentDidMount` uses:
* Update component state.
* For fetching data.
* For `addEventListiner` if we need to add it manually.

##### Note:
>You may call setState() immediately in componentDidMount(). It will trigger an extra rendering, but it will happen before the browser updates the screen.

To see this case you need to add this line inside `componentDidMount` method in `Child` component, you  will observe that `render` method called again after `componentDidMount`
```js
  this.increaseChildCounter()

```
