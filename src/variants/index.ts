import { tag, Tag } from '@storefront/core';

@tag('gb-variants', require('./index.html'))
class Variants {

  props: Variants.Props = {
    product: {
      data: {},
      variants: []
    }
  };
  persistent: number = 0;
  selected: any;

  init() {
    this.selected = this.props.product.data;
  }

  onSelect = (index: number, persist?: boolean) => {
    if (index === -1) {
      this.update({ selected: this.props.product.variants[this.persistent] });
    } else if (index < this.props.product.variants.length) {
      const selected = this.props.product.variants[index];

      if (persist) {
        this.update({ selected, persistent: index });
      } else {
        this.update({ selected });
      }
    }
  }
}

interface Variants extends Tag<Variants.Props> { }
namespace Variants {
  export interface Props extends Tag.Props {
    product: {
      data: any;
      variants: any[];
    };
  }
}

export default Variants;
