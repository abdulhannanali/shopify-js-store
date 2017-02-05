import React, { Component } from 'react'
import './index.css'

/**
 * CartDisplay
 * displays some detail from the Cart that's active at the 
 * time
 */
export default class CartDisplay extends Component {
    state = {}

    onCheckoutClick (event) {
        event.preventDefault()

        window.location.href = this.props.checkoutUrl
    }

    onEmptyClick (event) {
        event.preventDefault()

        if (this.props.onEmptyClick) {
            this.props.onEmptyClick()
        }
    }
    
    render () {
        return (
            <div className="Cart-Display">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Cart Items</h1>
                        <h2 className="Cart-Icon"><span className="glyphicon glyphicon-shopping-cart"></span></h2>
                        <h1>{this.props.cartItems}</h1>
                        <p className="cart-buttons">
                            <a href={this.props.checkoutUrl} onClick={this.onCheckoutClick.bind(this)} className="btn btn-success btn-lg">
                                Checkout
                            </a>
                            <a href="" onClick={this.onEmptyClick.bind(this)} className="btn btn-lg btn-danger">
                                Empty Cart
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
