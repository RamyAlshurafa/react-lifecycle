# react-lifecycle walk-through workshop:

## installation:
```bash
  $ git clone git@github.com:RamyAlshurafa/react-lifecycle.git
  $ cd react-lifecycle
```
 This workshop will be divided into stages:
## Stage-0 => Base stage:
```bash
$ npm i
$ npm run start:stage-0
```

This stage contains the core file structure required for the subsequent stages.


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
Keep note of the following points:
  *  when you increase the `Parent` counter (Change it's state) it will not affect the `Child counter`.
  * when you increase the `Child` counter (Change it's state) it will not affect the `Parent counter`.
  * when you hide the `Child` component and Show it again the `Child counter` will rested.

## Stage-1 => `Logger`:
```bash
$ npm i
$ npm run start:stage-1
```

In this stage we will add logging component to log every event that occurs under hook, and show the event target and event type.
We need to append this component into `App` and then manipulate it, but we won't change`App state`.

How are we going to do this? we need to create a module that lets us store, get and clear the state.
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

When does the component re-render?
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

###### Keep note of the following points:
* At first the we will see that `App` and `Parent` components will re-render.
* Showing child component will re-render `Parent` and `Child` components, this is because we change the `Parent` state.
* Hiding `Child` component will re-render `Parent` component only, because we didn't change the `App` state.
* Increasing `Parent` counter will re-render `Parent` and `Child`. Note that the `Child` counter will not change even though the `Child` component re-rendered.
* Increasing `Child` counter component will re-render `Child` only, because we didn't change any of `Parent` or `App` states.
## Stage-3 => `componentDidMount()`:
```bash
$ npm i
$ npm run start:stage-3
```

> componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

> This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in componentWillUnmount().

Now we will add our module inside the `componentDidMount` for `App`, `Parent` and `Child`.

```js
componentDidMount() {
  historyModule.add({ method:'componentDidMount', target:'Child' })
  /**
   * Uncomment the line below to update the state
   * It will re-render the component after `componentDidMount`
   * but `componentDidMount` itself will not called again
   */
  // this.increaseChildCounter()
}
```
Keep note of some points:
* `componentDidMount` occurs the component is rendered.
* When we show the `Child` component, it will render the `Child` then `componentDidMount` will be called.
* If the component is visible and the state changed `componentDidMount` will not occur.
* `componentDidMount` is called for `Parent` before `componentDidMount` for `App`. That means `componentDidMount` is called after all Children of the component and their children are `componentDidMount`.

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

## Stage-4 => `componentWillUnmount`:
```bash
$ npm i
$ npm run start:stage-4
```
> `componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed.

Now we will add our module inside the `componentWillUnmount()` for `App`, `Parent` and `Child`.
```js
componentWillUnmount() {
 historyModule.add({ method:'componentWillUnmount', target:`Child` })
 /**
 * Uncomment the line below to update the state
 * It will NOT re-render the component after `componentWillUnmount`
 * And `componentWillUnmount()` itself will not called again
 */
 // this.increaseChildCounter()
}
```

Keep note of some points:
* `componentWillUnmount` always occurs at the end of component lifecycle.

##### Caution:
> You should not call setState() in componentWillUnmount() because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.

To see this case add this line inside `componentWillUnmount` in `Child` component (nothing will change)
```js
this.increaseChildCounter()
```
##### `componentWillUnmount` uses:
* Canceling network requests.
* `clearInterval()`.
* `removeEventListener()`.
* Generally: cleaning up any subscriptions that were created in `componentDidMount()`.

## Stage-5 => `shouldComponentUpdate`:
```bash
$ npm i
$ npm run start:stage-5
```
> shouldComponentUpdate() is invoked before rendering when new props or state are being received. Defaults to true. This method is not called for the initial render or when forceUpdate() is used.

Now we will add our module inside the `shouldComponentUpdate()` for `Parent` and `Child`.

```js
shouldComponentUpdate(nextProps, nextState) {
  /**
   * Check if the new state is one of 2 multiples
   * then `shouldComponentUpdate` will return true
   * this means we want the component to re-render
   * else we won't re-render the component
   */
  if (this.state.childCounter % 2 === 0){
    historyModule.add({ method:'shouldComponentUpdate :: True', target:'Child' })
    return true;
  }
  historyModule.add({ method:'shouldComponentUpdate :: False', target:'Child' })
  return false;
}
```
Keep note of some points:
* When you Show the `Child` component `shouldComponentUpdate` will be called for `Parent` component because we changed its state, but `shouldComponentUpdate` will not be called for `Child` component.
* At every increase in `Parent` counter `shouldComponentUpdate` will be called for both `Parent` and `Child`.
* If the `shouldComponentUpdate` return `true` then `render` method will be called after, else `render()` will not be called.
