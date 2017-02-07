# Shopify JavaScript Store

DEMO: [https://hannanali.tech/shopify-js-store/](https://hannanali.tech/shopify-js-store/)

A simple store built using [Shopify's Buy SDK](https://shopify.github.io/js-buy-sdk/)
which allows user to explore the collections dynamically and checkout with a single item or add items to a cart.

This appliation is built using ReactJS

### Purpose behind building this application
I built this application in order to play with Shopify Buy SDK as well as explore, the amazing stuff I can build using this SDK.
 With the growing interest in Client Side application and new trends such as Progressive Web Applications web is more powerful than 
ever before.

Shopify Buy SDK is released right at time for such revolution. This is just one of the first step I took
in order to build something more cooler such as a PWA with the help of what Shopify Buy SDK enables us to do and 
experiment this Shopify Buy SDK along with technologies that are becoming a standard now such as [Polymer](https://www.polymer-project.org)

#### Things learnt from this project

We got to write a lot of Web components in this project, and that was a good amount of learning, however, the data structure we chose
for this application turned out to be very inefficient, and this project isn't going to be built upon, as we are storing the 
state as immutable. 

Instead of this, we are going to focus our efforts on another project, where the state is being managed efficiently, and these flaws
are reduced, in order for a lean structure which fits more to our usecase and help us for the development purposes. The state is more
robust.

We can solve one of the problem using `this.forceUpdate` but it would be a huge waste of time to make it work using 
`this.forceUpdate` as it's a big waste of time and doesn't really help us in making this application. `this.forceUpdate`
is discouraged almost everywhere, but we can still give it a shot.

#### LICENSE

MIT LICENSE. See [LICENSE](LICENSE) for more details