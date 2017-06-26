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
    link: () => {
      return this.services.url.beautifier.build('details', {
        id: this.state.data.id,
        title: this.state.data.title,
        variants: []
      });
    },
    onClick: () => {
      this.flux.details(this.state.data.id, this.state.data.title);
    }
  };

  init() {
    this.state = { ...this.state, ...this.props.product };
  }

  onUpdate() {
    this.state = { ...this.state, ...this.props.product };
    this.updateAlias('product', this.state);
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
    onClick(): void;
  }
}

export default Product;
