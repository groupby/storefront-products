import { Events, ProductTransformer, Selectors } from '@storefront/core';
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
        expect(products.state).to.eql({ products: [] });
      });
    });

    describe('productTransformer()', () => {
      it('should wrap ProductTransformer', () => {
        const data: any = { a: 'b' };
        const meta: any = { c: 'd' };
        const transformed = { y: 'z' };
        const structure = products.structure = <any>{ e: 'f' };
        const transformer = spy(() => ({ data: transformed }));
        const transformerFactory = stub(ProductTransformer, 'transformer').returns(transformer);

        expect(products.productTransformer({ data, index: 1, meta })).to.eql({ data: transformed, meta });
        expect(transformerFactory).to.be.calledWithExactly(structure);
        expect(transformer).to.be.calledWithExactly(data);
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
      const state = <any>{ a: 'b' };
      products.flux = <any>{ on: () => null };
      products.state = state;

      products.init();

      expect(products.state).to.eql(state);
    });
  });

  describe('updateProducts()', () => {
    it('should set products', () => {
      const idField = 'sku';
      const set = products.set = spy();
      const select = products.select = spy(() => ['a', 'b', 'c']);
      const transform = products.productTransformer = spy(() => 'x');
      products.config = <any>{ recommendations: { idField } };

      products.updateProducts();

      expect(set).to.be.calledWith({ products: ['x', 'x', 'x'] });
      expect(select).to.be.calledWithExactly(Selectors.productsWithPastPurchase, idField);
      expect(transform).to.have.callCount(3)
        .and.calledWith('a')
        .and.calledWith('b')
        .and.calledWith('c');
    });
  });
});
