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

  props: Products.Props = {
    storeSection: StoreSections.DEFAULT
  };

  state: Products.State = {
    products: []
  };
  productTransformer: Transformer = ({ data, meta }: Product) =>
    ({ ...ProductTransformer.transformer(this.structure)(data), meta })

  init() {
    switch (this.props.storeSection) {
      case StoreSections.PAST_PURCHASES:
        this.flux.on(Events.PAST_PURCHASE_PRODUCTS_UPDATED, this.updateProducts);
        break;
      case StoreSections.DEFAULT:
        this.flux.on(Events.PRODUCTS_UPDATED, this.updateProducts);
    }
  }

  updateProducts = (products: any = []) => {
    switch (this.props.storeSection) {
      case StoreSections.PAST_PURCHASES:
        this.set({ products: this.mapProducts(products) });
        break;
      case StoreSections.DEFAULT:
        this.set({
          products: this.select(Selectors.productsWithPastPurchase, this.config.recommendations.idField)
            .map(this.productTransformer)
        });
    }
  }

  mapProducts = (products: Store.ProductWithMetadata[]) => {
    return products.map(this.productTransformer);
  }
}

interface Products extends Tag<Products.Props, Products.State> { }
namespace Products {
  export interface Props extends Tag.Props {
    storeSection: string;
  }

  export interface State {
    products: any[];
  }
}

export default Products;
