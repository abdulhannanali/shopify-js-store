import React from 'react'
import classnames from 'classnames'
import isEmpty from 'lodash.isempty'

import './index.css'

const CollectionDisplay = ({ collection, onOrderCollection, products = [] }) => {
    const {
        collection_id: id,
        title,
        body_html,
        image = {}
    } = collection


    let collectionImage
    let collectionDetails
    let placeholder

    if (!id || !title) {
        placeholder = (
            <h1>Collection will be displayed here</h1>
        )
    } else {
        if (image && image.src) {
            collectionImage = (
                <img className='img-responsive' src={image.src} alt={title} />
            )
        }

        collectionDetails = (
            <div>
                {collectionImage}
                <h1>{title}</h1>
                <p>{body_html}</p>
            </div>
        ) 
    }

    return (

        <div className="row collection-display">
            <div className="col-sm-12">
                {placeholder}
                {collectionDetails}
                <OrderCollection onClick={onOrderCollection} productsAvailable={!isEmpty(products)}/>
            </div>
            <br />
        </div>
    )
}

/**
 * OrderCollection
 * Component that has a button in order to order a complete collection
 * 
 * -----------------
 * Reason for a separate component: Helps in separating a lot of what this OrderCollection button is going to do
 * for us
 */
const OrderCollection = ({ onClick = () => {}, productsAvailable = false }) => {
    const classes = classnames(['btn btn-primary btn-lg'], {
        'disabled': !productsAvailable
    })

    return (
        <div className="OrderCollection-button">
            <div className="row">
                <div className="col-sm-12">
                    <a href="#" onClick={onClick} className={classes}>
                        Add all products to Cart
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CollectionDisplay