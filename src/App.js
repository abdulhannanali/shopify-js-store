import React, { Component } from 'react';

// Importing CSS File
import 'react-select/dist/react-select.css'

import ShopifyApp from './ShopifyApp'

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Dynamic Shopify collection shop stop</h1>
          <p>Simple Single Page Application that demonstrates the use of <a href="https://shopify.github.io/js-buy-sdk/">Shopify Buy SDK</a></p>
          <h3>Built with {'<3'} using <a href="https://facebook.github.io/react">React</a></h3>
        </div>
        <div className="row">
          <ShopifyApp />
        </div>
      </div>
    );
  }
}