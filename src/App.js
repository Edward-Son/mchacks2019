import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './map.js';

class App extends Component {
  render() {
      return (
          <div className='App'>
              <div className='App-header'>
                  <h2>Tree is life</h2>
              </div>
              <div>
                  <Map />
              </div>
          </div>
      );
  }
}

export default App;
