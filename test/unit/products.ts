import { Events, ProductTransformer } from '@storefront/core';
import Products from '../../src/products';
import suite from './_suite';

const STRUCTURE = { a: 'b' };

suite('Products', ({ expect, spy, stub, itShouldBeConfigurable, itShouldHaveAlias }) => {
  let products: Products;

  beforeEach(() => {
    Products.prototype.config = <any>{ structure: STRUCTURE };
    products = new Products();
  });
  afterEach(() => delete Products.prototype.config);

  itShouldBeConfigurable(Products);
  itShouldHaveAlias(Products, 'products');

  describe('constructor()', () => {
    it('should set initial values', () => {
      expect(products.structure).to.eq(STRUCTURE);
    });

    describe('state', () => {
      it('should have initial value', () => {
        expect(products.state).to.eql({ products: [], variant: {} });
      });
    });
  });

  describe('init()', () => {
    it('should listen for PRODUCTS_UPDATED', () => {
      const on = spy();
      products.flux = <any>{ on };
      products.props = {};

      products.init();

      expect(on).to.be.calledWith(Events.PRODUCTS_UPDATED, products.updateProducts);
    });

    it('should mixin props to state', () => {
      const field = 'color';
      const display = 'swatch';
      products.flux = <any>{ on: () => null };
      products.state = <any>{ a: 'b' };
      products.props = <any>{ variantField: field, variantDisplay: display };

      products.init();

      expect(products.state).to.eql({ a: 'b', variant: { field, display } });
    });
  });

  describe('onUpdate()', () => {
    it('should mixin props to state', () => {
      const field = 'color';
      const display = 'swatch';
      products.state = <any>{ a: 'b' };
      products.props = <any>{ variantField: field, variantDisplay: display };

      products.onUpdate();

      expect(products.state).to.eql({ a: 'b', variant: { field, display } });
    });
  });

  describe('updateProducts()', () => {
    it('should set products', () => {
      const newProducts: any[] = ['a', 'b', 'c'];
      const set = products.set = spy();
      const transform = spy(() => 'x');
      const transformer = stub(ProductTransformer, 'transformer').returns(transform);

      products.updateProducts(newProducts);

      expect(set).to.be.calledWith({ products: ['x', 'x', 'x'] });
      expect(transformer).to.be.calledWith(STRUCTURE);
      expect(transform).to.be.calledWith('a').calledWith('b').calledWith('c');
    });
  });
});
