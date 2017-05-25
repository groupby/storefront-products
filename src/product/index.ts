import { view, Component, Store } from '@storefront/core';

@view('gb-product', '<yield/>', [
  { name: 'product', default: {} }
])
class Product extends Component {
  props: Product.Props;
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
