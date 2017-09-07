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
    persistent: 0,
    link: () => {
      return this.services.url.beautifier.build('details', {
        id: this.state.data.id,
        title: this.state.data.title,
        variants: []
      });
    },
    onClick: () => this.flux.details(this.state.data.id, this.state.data.title),
    onSelect: (index, persist) => {
      if (index === -1) {
        this.set({ selected: this.props.product.variants[this.state.persistent] });
      } else if (index < this.props.product.variants.length) {
        const selected = this.props.product.variants[index];
        this.set(persist ? { selected, persistent: index } : { selected });
      }
    }
  };

  init() {
    this.state = { ...this.state, ...this.props.product };
  }

  onUpdate() {
    this.state = { ...this.state, ...this.props.product, data: this.state.selected || this.state.data };
    this.updateAlias('product', this.state);
  }
}

interface Product extends Tag<Product.Props, Product.State> { }
namespace Product {
  export interface Props extends Tag.Props {
    product: {
      data: any;
      variants: any[];
    };
    display?: string;
  }

  export interface State {
    selected?: any;
    persistent: number;
    data: any;
    variants: any[];
    link(): string;
    onClick(): void;
    onSelect(index: number, persist?: boolean): void;
  }
}

export default Product;
