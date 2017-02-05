import React from 'react'
import './index.css'

const CollectionDisplay = ({ collection }) => {
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
            </div>
            <br />
        </div>
    )
}

export default CollectionDisplay