import { alias, configurable, tag, Events, ProductTransformer, Store, Structure, Tag } from '@storefront/core';

@configurable
@alias('products')
@tag('gb-products', require('./index.html'))
class Products {

  structure: Structure = this.config.structure;
  state: Products.State = {
    products: [],
    variant: {}
  };

  init() {
    this.flux.on(Events.PRODUCTS_UPDATED, this.updateProducts);
    this.state = { ...this.state, variant: { field: this.props.variantField, display: this.props.variantDisplay } };
  }

  onUpdate() {
    this.state = { ...this.state, variant: { field: this.props.variantField, display: this.props.variantDisplay } };
  }

  updateProducts = (products: Store.Product[]) =>
    this.set({
      products: products.map(ProductTransformer.transformer(this.structure))
    })
}

interface Products extends Tag<Products.Props, Products.State> { }
namespace Products {
  export interface Props extends Tag.Props {
    variantField?: string;
    variantDisplay?: string;
  }

  export interface State {
    products: any[];
    variant: {
      field?: string
      display?: string;
    };
  }
}

export default Products;
