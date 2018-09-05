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
