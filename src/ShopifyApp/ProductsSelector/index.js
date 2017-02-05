import React, { Component } from 'react'

import isEmpty from 'lodash.isempty'
import chunk from 'lodash.chunk'

import ProgressBar from '../ProgressBar'

import './index.css'

/**
 * ProductsSelector/index.js
 *
 * ProductsSelector allows us to select products to be used by the application
 * in order to add to Cart, the functionality it achieves is of view, cart addition functionality
 * is handled by the parent component, in order to maintain a separation of concerns here
 */
export default class ProductsSelector extends Component {
    render () {
        if (this.props.products === 'loading') {
            return (
                <ProgressBar />
            )
        }

        const productThumbs = this.getProductThumbs(this.props.products)
        const productRows = chunk(productThumbs, 3).map((thumbsChunk) => (
            <div className="row">
                {thumbsChunk}
            </div>
        ))

        let noProductsMessage
        
        if (isEmpty(productThumbs)) {
            noProductsMessage = (
                <h1>No products there in this collection</h1>
            )
        }

        return (
            <div className="row">
                <div className="col-sm-12">
                    {noProductsMessage}
                    {productRows}
                </div>
            </div>
        )
    }

    buyNow (product, event) {
        event.preventDefault()
        window.location.href = product.selectedVariant.checkoutUrl()
    }

    /**
     * addToCart
     * function is called when we want to add something to a cart
     */
    addToCart (product, event) {
        event.preventDefault()
        const onAddCart = this.props.onAddCart || (() => {})

        onAddCart(product)
    }

    /**
     * getProductThumbs
     * generates the thumbnails of the products
     * to be considered
     */
    getProductThumbs (products = []) {

        return products.map((product) => {
            const selectedVariant = product.selectedVariant

            return (
                <div key={product.id} className="col-sm-6 col-md-4">
                    <div className="thumbnail">
                        <img className="img-responsive" 
                             src={product.selectedVariantImage && product.selectedVariantImage.src} 
                             alt={product.title}
                             height="360px" />
                        <div className="caption">
                            <h3>{product.title}</h3>
                            <p><StockLabel available={selectedVariant.available}/></p>
                            <p dangerouslySetInnerHTML={{__html: product.description || ''}} />
                        </div>
                        <div className="thumb-buttons">
                            <a href="#" onClick={this.buyNow.bind(this, product)} 
                                        className='btn btn-default'>
                                Buy Now!
                            </a>
                            <a href="#" className="btn btn-primary" onClick={this.addToCart.bind(this, product)}>
                                Add To Cart <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                            </a>
                        </div>
                    </div>
                </div>
            )
        })
    }
}


const StockLabel = ({ available }) => {
    if (available) {
        return (
            <span className='label label-success'>In Stock</span>
        )
    } else {
        return (
            <span className='label label-danger'>Out of Stock</span>
        )
    }
}