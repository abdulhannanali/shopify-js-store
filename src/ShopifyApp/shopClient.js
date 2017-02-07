/**
 * shopClient.js
 * Shopify Client based on Shopify Buy SDK, to be used for fetching details
 * Also generates a cart to be used
 */

import ShopifyBuy from 'shopify-buy'
import {
    SHOPIFY_API_KEY,
    SHOPIFY_DOMAIN,
    SHOPIFY_APP_ID
} from '../constants'

const shopClient = ShopifyBuy.buildClient({
    apiKey: SHOPIFY_API_KEY,
    appId: SHOPIFY_APP_ID,
    domain: SHOPIFY_DOMAIN
})

window.shopClient = shopClient

export default shopClient