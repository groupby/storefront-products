import {
  alias,
  configurable,
  tag,
  Events,
  ProductTransformer,
  Selectors,
  Store,
  StoreSections,
  Structure,
  Tag,
} from '@storefront/core';
import Product = Store.ProductWithMetadata;

export type Transformer = (product: Product) => { data: object, variants: object[], meta: any };

@configurable
@alias('products')
@tag('gb-products', require('./index.html'))
class Products {
  structure: Structure = this.config.structure;

  state: Products.State = {
    products: []
  };

  init() {
    this.flux.on(Events.PRODUCTS_UPDATED, this.updateProducts);
    // this.fetchTrendingProducts();
  }

  updateProducts = () => {
    this.set({
      products: this.select(Selectors.productsWithPastPurchase, this.config.recommendations.idField)
        .map(this.productTransformer)
    });
  }

  fetchTrendingProducts = () => {
    const request = {
      method: 'POST',
      body: JSON.stringify({
        type: 'order',
        size: '4',
        target: 'sku',
        window: 'week'
      })
    };

    // tslint:disable-next-line:max-line-length
    const url = `https://${this.config.customerId}.groupbycloud.com/wisdom/v2/public/recommendations/products/_getTrending`;
    this.flux.store.dispatch(this.flux.actions.customFetchProducts({ request, url }));

  }
}

interface Products extends Tag<Tag.Props, Products.State> { }
namespace Products {
  export interface State {
    products: any[];
  }
}

export default Products;
