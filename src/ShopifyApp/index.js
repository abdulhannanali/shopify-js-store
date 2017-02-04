import React, { Component } from 'react'
import CollectionSelect from './CollectionSelect'

export default class ShopifyApp extends Component {
    constructor () {
        super()
    }

    onSelectChange ({ collections, selected }) {
        const selectedCollection = collections.filter((collection) => collection.collection_id === selected)[0]

        this.setState({
            collection: selectedCollection,
            allCollections: collections
        })
    }
    
    render () {
        return (
            <CollectionSelect onChange={this.onSelectChange.bind(this)} />
        )
    }
}