import { Events, ProductTransformer, Selectors, StoreSections } from '@storefront/core';
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
      products.props = { storeSection: StoreSections.SEARCH };

      products.init();

      expect(on).to.be.calledWith(Events.PRODUCTS_UPDATED, products.updateProducts);
    });

    it('should listen for PAST_PURCHASE_PRODUCTS_UPDATED', () => {
      const on = spy();
      products.flux = <any>{ on };
      products.props = { storeSection: StoreSections.PAST_PURCHASES };

      products.init();

      expect(on).to.be.calledWith(Events.PAST_PURCHASE_PRODUCTS_UPDATED, products.updatePastPurchaseProducts);
    });

    it('should mixin props to state', () => {
      const state = <any>{ a: 'b' };
      products.flux = <any>{ on: () => null };
      products.state = state;
      products.props = {};
      products.props.storeSection = StoreSections.DEFAULT;

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
      products.props = {};
      products.props.storeSection = StoreSections.DEFAULT;

      products.updateProducts();

      expect(set).to.be.calledWith({ products: ['x', 'x', 'x'] });
      expect(select).to.be.calledWithExactly(Selectors.productsWithPastPurchase, idField);
      expect(transform).to.have.callCount(3)
        .and.calledWith('a')
        .and.calledWith('b')
        .and.calledWith('c');
    });
  });
  describe('updatePastPurchaseProducts()', () => {
    it('should set past purchase products', () => {
      const idField = 'sku';
      const set = products.set = spy();
      const productsArray = ['a', 'b', 'c'];
      const mapProducts = products.mapProducts = spy(() => productsArray);
      products.props = { storeSection: StoreSections.PAST_PURCHASES };

      products.updatePastPurchaseProducts(productsArray);

      expect(set).to.be.calledWith({ products: productsArray });
      expect(mapProducts).to.be.calledWithExactly(productsArray);
    });
  });

  describe('mapProducts()', () => {
    it('should call map with producttransformer', () => {
      const map = spy();
      const productsArray: any = { map };

      products.mapProducts(productsArray);

      expect(map).to.be.calledWithExactly(products.productTransformer);
    });
  });
});
