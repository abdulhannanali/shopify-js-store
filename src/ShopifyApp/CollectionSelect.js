import React, { Component } from 'react'
import Select from 'react-select'

import shopClient from './shopClient'

/**
 * CollectionSelect
 * Selects the collection to be displayed using ShopifyAPI
 */
export default class CollectionSelect extends Component {
    constructor () {
        super()

        this.state = {
            collections: [],
            error: false,
            inProgress: false
        }

        this.fetchCollections = this.fetchCollections.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount () {
        this.fetchCollections()
    }
    
    async fetchCollections () {
        try {
            console.log('fetch')
            const collections = await shopClient.fetchAllCollections()
            const collectionsData = collections.map((collection) => collection.attrs)

            console.log(collectionsData)
            this.setState({
                collections: collectionsData,
                selectedValue: collectionsData[0].collection_id
            })
        } catch (error) {
            this.setState({
                error: true
            })
        }
    }
    
    onChange (object) {
        this.setState({
            selectedValue: object.value
        })

        if (this.props.onChange) {
            this.props.onChange({
                collections: this.state.collections,
                selected: object.value
            })
        }
    }

    render () {
        const selectValues = this.state.collections.map((collection) => {
            return {
                value: collection.collection_id,
                label: collection.title
            }
        }) 

        return (
            <div class="collection-select">
                <Select options={selectValues}
                        onChange={this.onChange}
                        value={this.state.selectedValue} />
            </div>
        )
    }
}   