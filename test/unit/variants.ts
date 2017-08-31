import { Events, ProductTransformer } from '@storefront/core';
import Variants from '../../src/variants';
import suite from './_suite';

suite('Variants', ({ expect, spy }) => {
  let variants: Variants;

  beforeEach(() => variants = new Variants());

  describe('constructor()', () => {
    it('should set persistent index', () => {
      expect(variants.persistent).to.eq(0);
    });

    describe('props', () => {
      it('should have initial value', () => {
        expect(variants.props).to.eql({ product: { data: {}, variants: [] } });
      });
    });
  });

  describe('init()', () => {
    it('should set selected data from props', () => {
      const data = { a: 'b' };
      variants.props = <any>{ product: { data } };

      variants.init();

      expect(variants.selected).to.eq(data);
    });
  });

  describe('onSelect()', () => {
    it('should revert back to persistent selection', () => {
      const update = variants.update = spy();
      const oldVariant = { a: 'b' };
      variants.persistent = 2;
      variants.props.product.variants = [{}, {}, oldVariant, {}];

      variants.onSelect(-1);

      expect(update).to.be.calledWith({ selected: oldVariant });
    });

    it('should update to new selection', () => {
      const update = variants.update = spy();
      const newVariant = { a: 'b' };
      variants.props.product.variants = [{}, newVariant, {}];

      variants.onSelect(1);

      expect(update).to.be.calledWith({ selected: newVariant });
    });

    it('should update to new selection and set persistent', () => {
      const update = variants.update = spy();
      const newVariant = { a: 'b' };
      const index = 1;
      variants.props.product.variants = [{}, newVariant, {}];

      variants.onSelect(index, true);

      expect(update).to.be.calledWith({ selected: newVariant, persistent: index });
    });
  });
});
