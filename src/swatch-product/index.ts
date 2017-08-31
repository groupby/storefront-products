import { alias, tag, utils, Tag } from '@storefront/core';

@alias('swatchProduct')
@tag('gb-swatch-product', require('./index.html'))
class SwatchProduct {

  state: any = {
    options: () => {
      return this.props.product.variants.map((variant) => utils.dot.get(variant, this.props.field));
    }
  };
}

interface SwatchProduct extends Tag { }
namespace SwatchProduct {
  export interface Props {
    field: string;
    product: {
      data: any;
      variants: any[];
    };
  }
}

export default SwatchProduct;
