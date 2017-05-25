import { Component, Events } from '@storefront/core';
import Products from '../../src/products';
import suite from './_suite';

suite('Products', ({ expect, spy }) => {

  describe('constructor()', () => {
    afterEach(() => {
      delete Component.prototype.config;
      delete Component.prototype.expose;
      delete Component.prototype.flux;
    });

    it('should call expose()', () => {
      const expose = Component.prototype.expose = spy();
      Component.prototype.config = <any>{ structure: {} };
      Component.prototype.flux = <any>{ on: () => null };

      new Products();

      expect(expose.calledWith('products')).to.be.true;
    });

    it('should listen for PRODUCTS_UPDATED', () => {
      const on = spy();
      Component.prototype.flux = <any>{ on };
      Component.prototype.config = <any>{ structure: {} };
      Component.prototype.expose = () => null;

      const products = new Products();

      expect(on.calledWith(Events.PRODUCTS_UPDATED, products.updateProducts)).to.be.true;
    });
  });
});
