import SwatchVariantControls from '../../src/swatch-variant-controls';
import suite from './_suite';

suite('SwatchVariantControls', ({ expect, spy }) => {
  let swatchControls: SwatchVariantControls;

  beforeEach(() => swatchControls = new SwatchVariantControls());

  describe('onClick()', () => {
    it('should call props.onSelect() with persistence', () => {
      const index = 3;
      const onSelect = spy();
      swatchControls.props = <any>{ onSelect };

      swatchControls.onClick(index);

      expect(onSelect).to.be.calledWithExactly(index, true);
    });

    it('should call not props.onSelect() if nonexistent', () => {
      swatchControls.props = <any>{};

      expect(() => swatchControls.onClick(2)).to.not.throw();
    });
  });

  describe('onSelect()', () => {
    it('should call props.onSelect() with index when selecting', () => {
      const index = 7;
      const onSelect = spy();
      swatchControls.props = <any>{ onSelect };

      swatchControls.onSelect(index, true);

      expect(onSelect).to.be.calledWithExactly(index);
    });

    it('should call props.onSelect() with index -1 deselecting', () => {
      const onSelect = spy();
      swatchControls.props = <any>{ onSelect };

      swatchControls.onSelect(7, false);

      expect(onSelect).to.be.calledWithExactly(-1);
    });

    it('should call not props.onSelect() if nonexistent', () => {
      swatchControls.props = <any>{};

      expect(() => swatchControls.onSelect(2, true)).to.not.throw();
    });
  });
});
