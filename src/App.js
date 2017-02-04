import React, { Component } from 'react';
import Select from 'react-select'

// Importing CSS File
import 'react-select/dist/react-select.css'

import ShopifyApp from './ShopifyApp'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Shopify JavaScript Store</h1>
          <p>Simple JavaScript Store built using <a href="https://facebook.github.io/react">ReactJS</a> just a proof of concept</p>
        </div>
        <div className="row">
          <ShopifyApp />
        </div>
      </div>
    );
  }
}

export default App;
