import React, { Component } from 'react';

const HistoryLogger = (props) => {
    return (
      <div className="historyLogger">
      {props.historyArray.map((element, index)=> <h4>{element.method} ==>> {element.target}</h4>)}
      </div>
    )
  }

export default HistoryLogger;
