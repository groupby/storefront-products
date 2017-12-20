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
    // we force an update on init to avoid race condition issues
    switch (this.props.storeSection) {
      case StoreSections.PAST_PURCHASES:
        this.updatePastPurchaseProducts(this.select(Selectors.pastPurchaseProducts));
        this.flux.on(Events.PAST_PURCHASE_PRODUCTS_UPDATED, this.updatePastPurchaseProducts);
        break;
      case StoreSections.SEARCH:
        this.updateProducts();
        this.flux.on(Events.PRODUCTS_UPDATED, this.updateProducts);
        break;
    }
  }

  productTransformer: Transformer = ({ data, meta }: Product) =>
    ({ ...ProductTransformer.transformer(this.structure)(data), meta })

  updateProducts = () => {
    const products = this.select(Selectors.productsWithPastPurchase, this.config.recommendations.idField);
    this.set({
      products: products.map(this.productTransformer)
    });
  }

  updatePastPurchaseProducts = (products: any = []) =>
    this.set({ products: products
             .map(({ meta, ...data }) => ({ data, meta }))
             .map(this.productTransformer) })
}

interface Products extends Tag<Tag.Props, Products.State> { }
namespace Products {
  export interface State {
    products: any[];
  }
}

export default Products;
