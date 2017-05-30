import { view, Component, Events, ProductTransformer, Store, Structure } from '@storefront/core';

@view('gb-products', require('./index.html'))
class Products extends Component {

  structure: Structure = this.config.structure;
  state: Products.State = {
    products: []
  };

  constructor() {
    super();
    this.expose('products');
    this.flux.on(Events.PRODUCTS_UPDATED, this.updateProducts);
  }

  updateProducts = (products: Store.Product[]) =>
    this.set({
      products: products.map((product) => ProductTransformer.transform(product, this.structure))
    })
}

namespace Products {
  export interface State {
    products: any[];
  }
}

export default Products;
