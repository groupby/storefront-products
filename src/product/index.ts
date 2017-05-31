import { tag, Store, Tag } from '@storefront/core';

@tag('gb-product', '<yield/>', [
  { name: 'product', default: {} }
])
class Product {

  state: Product.State = {
    data: {},
    variants: [],
    // TODO: needs to come from beautifier
    link: () => `/details/${this.state.data.id}`
  };

  onBeforeMount() {
    this.state = { ...this.state, ...this.props.product };
    this.expose('product');
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
