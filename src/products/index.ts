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
    switch (this.props.storeSection) {
      case StoreSections.PAST_PURCHASES:
        this.flux.on(Events.PAST_PURCHASE_PRODUCTS_UPDATED, this.updatePastPurchaseProducts);
        break;
      case StoreSections.SEARCH:
        this.flux.on(Events.PRODUCTS_UPDATED, this.updateProducts);
        break;
    }
  }

  productTransformer: Transformer = ({ data, meta }: Product) =>
    ({ ...ProductTransformer.transformer(this.structure)(data), meta })

  updateProducts = () =>
    this.set({
      products: this.select(Selectors.productsWithPastPurchase, this.config.recommendations.idField)
        .map(this.productTransformer)
    })

  updatePastPurchaseProducts = (products: any = []) =>
    this.set({ products: products.map(this.productTransformer) })
}

interface Products extends Tag<Tag.Props, Products.State> { }
namespace Products {
  export interface State {
    products: any[];
  }
}

export default Products;
