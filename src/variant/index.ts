import { alias, tag, utils, Tag } from '@storefront/core';

@alias('variant')
@tag('gb-variant', require('./index.html'))
class Variant {

  state: any = {
    options: () => {
      return this.props.product.variants.map((variant) => utils.dot.get(variant, this.props.field));
    }
  };

  init() {
    this.state = { ...this.state, display: this.props.display };
  }

  onUpdate() {
    this.state = { ...this.state, display: this.props.display };
  }
}

interface Variant extends Tag<Variant.Props, Variant.State> { }
namespace Variant {
  export interface Props extends Tag.Props {
    field: string;
    display: string;
    product: {
      data: any;
      variants: any[];
    };
  }

  export interface State {
    options: () => any[];
    display: string;
  }
}

export default Variant;
