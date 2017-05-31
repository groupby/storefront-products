import { Events } from '@storefront/core';
import Products from '../../src/products';
import suite from './_suite';

suite('Products', ({ expect, spy }) => {
  let products: Products;

  beforeEach(() => {
    Products.prototype.config = <any>{ structure: {} };
    products = new Products();
  });
  afterEach(() => delete Products.prototype.config);

  describe('init()', () => {
    it('should call expose()', () => {
      const expose = products.expose = spy();
      products.flux = <any>{ on: () => null };

      products.init();

      expect(expose.calledWith('products')).to.be.true;
    });

    it('should listen for PRODUCTS_UPDATED', () => {
      const on = spy();
      products.flux = <any>{ on };
      products.expose = () => null;

      products.init();

      expect(on.calledWith(Events.PRODUCTS_UPDATED, products.updateProducts)).to.be.true;
    });
  });
});
