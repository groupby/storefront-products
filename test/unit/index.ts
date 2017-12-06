import * as pkg from '../../src';
import PastPurchasesProducts from '../../src/past-purchases-products';
import Products from '../../src/products';
import suite from './_suite';

suite('package', ({ expect }) => {
  it('should expose Products', () => {
    expect(pkg.Products).to.eq(Products);
  });
});
