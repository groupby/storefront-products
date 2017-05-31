import { tag, Events, ProductTransformer, Store, Structure, Tag } from '@storefront/core';

@tag('gb-products', require('./index.html'))
class Products {

  structure: Structure = this.config.structure;
  state: Products.State = {
    products: []
  };

  init() {
    this.expose('products');
    this.flux.on(Events.PRODUCTS_UPDATED, this.updateProducts);
  }

  updateProducts = (products: Store.Product[]) =>
    this.set({
      products: products.map((product) => ProductTransformer.transform(product, this.structure))
    })
}

interface Products extends Tag<any, Products.State> { }
namespace Products {
  export interface State {
    products: any[];
  }
}

export default Products;
