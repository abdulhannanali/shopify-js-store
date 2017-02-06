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
    constructor () {
        super()

        this.addAllVariants = this.addAllVariants.bind(this)
        this.onQuantityChange = this.onQuantityChange.bind(this)

        this.state = {
            productsQuantity: {}
        }
    }

    /**
     * onQuantityChange
     * Change the quantity of the products
     */
    onQuantityChange (product, event) {
        event.persist()

        this.setState({
            productsQuantity: Object.assign({}, this.state.productsQuantity, {
                [product.id]: event.target.value
            })
        })
    }

    render () {
        if (this.props.products === 'loading') {
            return (
                <ProgressBar />
            )
        }

        const productThumbs = this.getProductThumbs(this.props.products)
        const masonryThumbs = this.masonThumbs(productThumbs)

        let noProductsMessage
        let noCollectionMessage

        if (isEmpty(productThumbs)) {
            noProductsMessage = (
                <h1>No products there in this collection</h1>
            )
        } 
        if (isEmpty(this.props.collection)) {
            noCollectionMessage = (
                <h1>Select a collection to see the list of products</h1>
            )
        }

        return (
            <div className="ProductsSelector">
                <div className="row">
                    <div className='col-sm-12 products-heading'>
                        <h1>Products</h1>
                        {noCollectionMessage || noProductsMessage}
                    </div>
                </div>
                <div className="row">
                    {masonryThumbs}
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
        const productQuantity = this.state.productsQuantity[product.id]

        console.log(productQuantity)

        onAddCart(product, productQuantity)
    }

    /**
     * event handler to be called when we want to addAllVariants
     * related to a certain product
     */
    addAllVariants (product, event) {
        event.preventDefault()
        const onAddVariants = this.props.onAddVariants || (() => {})

        onAddVariants(product)
    }

    /**
     * getProductThumbs
     * generates the thumbnails of the products
     * to be considered
     */
    getProductThumbs (products = []) {

        return products.map((product) => {
            const selectedVariant = product.selectedVariant
            const productQuantity = this.state.productsQuantity[selectedVariant.id] || 1

            return (
                <div key={selectedVariant.id.toString()} data-key={selectedVariant.id.toString()} className="product-thumb">
                    <div className="thumbnail">
                        <img className="img-responsive" 
                             src={product.selectedVariantImage && product.selectedVariantImage.src} 
                             alt={product.title}
                             height="360px" />
                        <div className="caption">
                            <h3>{product.title}</h3>
                            <p><StockLabel available={selectedVariant.available}/></p>
                            <p dangerouslySetInnerHTML={{__html: product.description || ''}} />
                            <p>Price: ${product.selectedVariant.price}</p>
                        </div>
                        <div className="Quantity-select">
                            <p>Select Quantity for Product</p>
                            <input type="number" 
                                className="form-control" 
                                value={productQuantity}
                                onChange={this.onQuantityChange.bind(this, selectedVariant)} />
                        </div>
                        <div className="thumb-buttons">
                            <a href="#" onClick={this.buyNow.bind(this, product)} 
                                        className='btn btn-default'>
                                Buy Now!
                            </a>
                            <a href="#" className="btn btn-primary" onClick={this.addToCart.bind(this, selectedVariant)}>
                                Add To Cart <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                            </a>
                            <a href="#" className="btn btn-info" onClick={this.addAllVariants.bind(this, product)}>
                                Add All Variants
                            </a>
                        </div>
                    </div>
                </div>
            )
        })
    }

    /**
     * masonThumbs
     * Arranges the thumbnails within the columns in a way, that they give an effect 
     * similar to what we achieve using Masonry 3.
     * We do this by keeping the content within the vertical rows
     * 
     * @param {Array} productThumbs Array of Product thumbnails without any column or row wrapped around
     * @returns {Array} array of thumbnails arranged within Columns which are treated as Vertical rows here.
     */
    masonThumbs (productThumbs) {
        const colLength = Math.ceil(productThumbs.length / 3)
        const chunkedThumbs = chunk(productThumbs, colLength)
        const colThumbs = chunkedThumbs.map((thumb) => {
            return (
                <div className="col-md-4 col-sm-12">
                    {thumb}
                </div>
            )
        })


        return colThumbs
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