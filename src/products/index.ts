import {
  alias,
  configurable,
  tag,
  Events,
  ProductTransformer,
  Selectors,
  Store,
  Structure,
  Tag
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
  productTransformer: Transformer = ({ data, meta }: Product) =>
    ({ ...ProductTransformer.transformer(this.structure)(data), meta })

  init() {
    this.flux.on(Events.PRODUCTS_UPDATED, this.updateProducts);
  }

  updateProducts = () =>
    this.set({
      products: this.select(Selectors.productsWithMetadata, this.config.recommendations.idField)
        .map(this.productTransformer)
    })
}

interface Products extends Tag<any, Products.State> { }
namespace Products {
  export interface State {
    products: any[];
  }
}

export default Products;
