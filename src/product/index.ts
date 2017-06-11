import { alias, tag, Store, Tag } from '@storefront/core';

@alias('product')
@tag('gb-product', require('./index.html'))
class Product {

  props: Product.Props = {
    product: {
      data: {},
      variants: []
    }
  };
  state: Product.State = {
    data: {},
    variants: [],
    // TODO: needs to come from beautifier
    link: () => `/details/${this.state.data.id}`
  };

  init() {
    this.state = { ...this.state, ...this.props.product };
  }
}

interface Product extends Tag<Product.Props, Product.State> { }
namespace Product {
  export interface Props {
    product: {
      data: any;
      variants: any[];
    };
  }

  export interface State {
    data: any;
    variants: any[];
    link(): string;
  }
}

export default Product;
