import { consume, tag, utils, Tag } from '@storefront/core';
import Product from '../product';

@consume('product')
@tag('gb-swatch-variant-controls', require('./index.html'))
class SwatchVariantControls {
  aliases: SwatchVariantControls.Aliases;

  options = () => this.aliases.product.variants.map((variant) => utils.dot.get(variant, this.props.field));

  onClick = (index: number) => this.aliases.product.onSelect && this.aliases.product.onSelect(index, true);

  onSelect = (index: number, isActive: boolean) =>
    this.aliases.product.onSelect && this.aliases.product.onSelect(isActive ? index : -1);
}

interface SwatchVariantControls extends Tag<SwatchVariantControls.Props> {}
namespace SwatchVariantControls {
  export interface Props {
    field: string;
    onSelect(index: number, persist?: boolean);
  }

  export interface Aliases {
    product: Product.State;
  }
}

export default SwatchVariantControls;
