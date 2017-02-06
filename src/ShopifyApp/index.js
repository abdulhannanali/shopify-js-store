import React, { Component } from 'react'

import CollectionSelect from './CollectionSelect'
import CollectionDisplay from './CollectionDispaly'
import ProductsSelector from './ProductsSelector'
import CartDisplay from './CartDisplay'
import CircularLoader from './CircularLoader'

import shopClient from './shopClient'

import './index.css'

export default class ShopifyApp extends Component {
    constructor () {
        super()

        this.state = {
            collection: {}, // Collection to be focused on by the Screen
            products: {}, // Contains all the products there needs to be for an application
            cartItems: 0,  // Primary Cart to be used by all application
            checkoutUrl: '',
            collections: [],
            collectionLoading: true
        }

        this.initCart = this.initCart.bind(this)
        this.onAddCart = this.onAddCart.bind(this)
        this.fetchAllCollections = this.fetchAllCollections.bind(this)
        this.onAddVariants = this.onAddVariants.bind(this)
        this.onOrderCollection = this.onOrderCollection.bind(this)

        this.fetchAllCollections()
    }

    /**
     * fetchAllCollections
     * fetches all the collections for a given Shopify store
     * and store them in ShopifyApp's component state in order to pass them
     * into CollectionSelect Component
     */
    async fetchAllCollections () {
        try {
            const collections = await shopClient.fetchAllCollections()
            const collectionsData = collections.map((collection) => collection.attrs)

            this.setState({
                collections: collectionsData,
                collectionLoading: false
            })

        } catch (error) {
            this.setState({
                collections: []
            })
        }
    }

    /**
     * onOrderCollection
     * 
     */
    async onOrderCollection (event) {
        event.preventDefault()
        const products = this.state.products[this.state.collection.collection_id]
        await Promise.all(products.map((product) => (this.cart.createLineItemsFromVariants({
            variant: product.selectedVariant,
            quantity: 1
        }))))

        this.setState({
            checkoutUrl: this.cart.checkoutUrl,
            cartItems: this.cart.lineItemCount
        })
    }

    /**
     * componentDidMount
     * React LifeCycle Hook
     */
    componentDidMount () {
        this.shopifyInitializations.bind(this)()
    }

    /**
     * shopifyInitializations
     * initilizations to be perform first time the component mounts,
     * such as initializing cart and other stuff
     */
    async shopifyInitializations () {
        await this.initCart()
        await this.fetchAllCollections()
    }

    /**
     * initCart
     * initializes a cart with an instance that's used for every computation made afterwards 
     * for the Shopify Application
     */
    async initCart () {
        try {
            this.cart = await shopClient.fetchRecentCart()
            this.setState({
                checkoutUrl: this.cart.checkoutUrl,
                cartItems: this.cart.lineItemCount
            })
        } catch (error) {
            console.error('Error occured while initializing cart')
        }
    }

    async onSelectChange ({ selected }) {
        const selectedCollection = this.state.collections.filter(
            (collection) => collection.collection_id === selected
        )[0]

        this.fetchProducts(selectedCollection.collection_id)

        this.setState({
            collection: selectedCollection
        })
    }

    /**
     * onAddVariants
     * adds all the variants for a product to a cart
     */
    async onAddVariants (product) {
        const allVariants = product.variants.map((variant) => {
            return this.cart.createLineItemsFromVariants({
                variant,
                quantity: 1
            })
        })

        await Promise.all(allVariants)

        this.setState({
            cartItems: this.cart.lineItemCount,
            checkoutUrl: this.cart.checkoutUrl
        })
    }


    /**
     * fetchProducts
     * fetches the products from the Shopify API
     */
    async fetchProducts (collection_id) {
        if (this.state.products[collection_id]) {
            return
        }

        // Set the products fetching to loading state
        this.setState({
            products: Object.assign({}, this.state.products, {
                [collection_id]: 'loading'
            })
        })

        const products = await shopClient.fetchQueryProducts({ collection_id: collection_id })
        const newProducts = Object.assign({}, this.state.products, {
            [collection_id]: products
        })

        this.setState({
            products: newProducts
        })
    }

    /**
     * onAddCart
     * event is called when we want to add a product
     * to a cart
     */
    async onAddCart (selectedVariant, quantity = 1) {
        await this.cart.createLineItemsFromVariants({
            variant: selectedVariant,
            quantity
        })

        this.setState({
            cartItems: this.cart.lineItemCount || 0,
            checkoutUrl: this.cart.checkoutUrl
        })

    }

    /**
     * onEmptyCart
     * function called when we want to empty the cart
     */
    async onEmptyCart () {
        await this.cart.clearLineItems()
        this.setState({
            cartItems: 0,
            checkoutUrl: this.cart.checkoutUrl
        })
    }
    
    render () {
        if (this.state.collectionLoading) {
            return (
                <div className="Collection-Loader">
                    <CircularLoader />
                </div>
            )
        }

        const selectedProducts = this.state.products[this.state.collection.collection_id]

        return (
            <div className="ShopifyApp">
                <div className="row">
                    <div className="col-sm-12">
                        <CollectionSelect
                            onChange={this.onSelectChange.bind(this)}
                            collections={this.state.collections}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <CollectionDisplay collection={this.state.collection}
                                           onOrderCollection={this.onOrderCollection} 
                                           products={selectedProducts} />
                    </div>
                    <div className="col-sm-6">
                        <CartDisplay
                            cartItems={this.state.cartItems}
                            checkoutUrl={this.state.checkoutUrl}
                            onEmptyClick={this.onEmptyCart.bind(this)}
                        />
                    </div>
                </div>
                <div className="row">
                    <ProductsSelector 
                        onAddCart={this.onAddCart} 
                        products={selectedProducts}
                        collection={this.state.collection}
                        onAddVariants={this.onAddVariants}
                    />
                </div>
            </div>
        )
    }
}