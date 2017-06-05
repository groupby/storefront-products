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
    console.log('product props: ', this.props);
  }

  onBeforeMount() {
    console.log('onBeforeMount');
    if (this.props.infinite) {
      this.root.classList.add('gb-infinite');
    }
    if (this.props.tombstone) {
      this.root.classList.add('tombstone');
    }
  }

  onUpdate() {
    console.log('product onUpdate: ', this.props.product);
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
    infinite?: boolean;
    tombstone?: boolean;
  }

  export interface State {
    data: any;
    variants: any[];
    link(): string;
  }
}

export default Product;
