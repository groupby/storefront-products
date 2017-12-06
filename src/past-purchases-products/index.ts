import { alias, tag, Events, Store } from '@storefront/core';
import Products from '../products';

@alias('products')
@tag('gb-past-purchases-products', require('./index.html'))
class PastPurchasesProducts extends Products {
  init() {
    this.flux.on(Events.PAST_PURCHASE_PRODUCTS_UPDATED, this.updateProducts);
  }

  updateProducts: any = (products: Store.ProductWithMetadata[]) =>
    this.set({ products: this.mapProducts(products) })

  mapProducts = (products: Store.ProductWithMetadata[]) => {
   return products.map(this.productTransformer);
  }
}

export default PastPurchasesProducts;
