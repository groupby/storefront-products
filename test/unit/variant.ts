import Variant from '../../src/variant';
import suite from './_suite';

suite('Variant', ({ expect, spy }) => {
  let variant: Variant;

  beforeEach(() => variant = new Variant());

  describe('constructor()', () => {
    describe('state', () => {
      describe('options()', () => {
        it('should return an array of variant values', () => {
          variant.props = <any>{ product: { variants: [{ color: 'red' }, { color: 'blue' }] }, field: 'color' };

          expect(variant.state.options()).to.eql(['red', 'blue']);
        });
      });
    });
  });

  describe('init()', () => {
    it('should mixin display to state', () => {
      const display = 'other';
      variant.props = <any>{ display };
      variant.state = <any>{ c: 'd' };

      variant.init();

      expect(variant.state).to.eql({ c: 'd', display });
    });
  });

  describe('onUpdate()', () => {
    it('should mixin display to state', () => {
      const display = 'other';
      variant.props = <any>{ display };
      variant.state = <any>{ c: 'd' };

      variant.onUpdate();

      expect(variant.state).to.eql({ c: 'd', display });
    });
  });
});
