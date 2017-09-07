import { tag, utils, Tag } from '@storefront/core';
import Product from '../product';

@tag('gb-swatch-variant-controls', require('./index.html'))
class SwatchVariantControls {

  $product: Product.State;

  init() {
    console.log(this.options());
  }

  options = () => this.$product.variants.map((variant) => {
    console.log(utils.dot.get(variant, this.props.field))
    return utils.dot.get(variant, this.props.field)
  });

  onClick = (index: number) =>
    this.$product.onSelect && this.$product.onSelect(index, true)

  onSelect = (index: number, isActive: boolean) =>
    this.$product.onSelect && this.$product.onSelect(isActive ? index : -1)

}

interface SwatchVariantControls extends Tag<SwatchVariantControls.Props> { }
namespace SwatchVariantControls {
  export interface Props extends Tag.Props {
    field: string;
    onSelect(index: number, persist?: boolean);
  }
}

export default SwatchVariantControls;
