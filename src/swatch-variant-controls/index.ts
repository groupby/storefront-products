import { tag, Tag } from '@storefront/core';

@tag('gb-swatch-variant-controls', require('./index.html'))
class SwatchVariantControls {

  onClick = (index: number) =>
    this.props.onSelect && this.props.onSelect(index, true)

  onSelect = (index: number, isActive: boolean) =>
    this.props.onSelect && this.props.onSelect(isActive ? index : -1)
}

interface SwatchVariantControls extends Tag<SwatchVariantControls.Props> { }
namespace SwatchVariantControls {
  export interface Props extends Tag.Props {
    onSelect(index: number, persist?: boolean);
  }
}

export default SwatchVariantControls;
