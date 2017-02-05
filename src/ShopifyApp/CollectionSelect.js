import React, { Component } from 'react'
import Select from 'react-select'

/**
 * CollectionSelect
 * Selects the collection to be displayed using ShopifyAPI
 */
export default class CollectionSelect extends Component {
    constructor () {
        super()

        this.onChange = this.onChange.bind(this)
        this.state = {
            selectedValue: undefined
        }
    }
    
    onChange (object) {
        this.setState({
            selectedValue: object.value
        })

        if (this.props.onChange) {
            this.props.onChange({
                selected: object.value
            })
        }
    }

    render () {
        console.log(this.props.collections)
        const selectValues = this.props.collections.map((collection) => {
            return {
                value: collection.collection_id,
                label: collection.title
            }
        }) 

        return (
            <div className="collection-select">
                <Select options={selectValues}
                        onChange={this.onChange}
                        value={this.state.selectedValue}
                        placeholder="Select a Shopify collection!" />
            </div>
        )
    }
}   