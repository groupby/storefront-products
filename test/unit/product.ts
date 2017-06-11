import Product from '../../src/product';
import suite from './_suite';

suite('Product', ({ expect }) => {
  let product: Product;

  beforeEach(() => product = new Product());

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(product.props).to.eql({
          product: {
            data: {},
            variants: []
          }
        });
      });
    });

    describe('state', () => {
      it('should have initial value', () => {
        expect(product.state.data).to.eql({});
        expect(product.state.variants).to.eql([]);
      });

      describe('link()', () => {
        it('should create details link', () => {
          const id = '123';
          product.state.data = { id };

          expect(product.state.link()).to.eq('/details/123');
        });
      });
    });
  });

  describe('init()', () => {
    it('shoud mixin product to state', () => {
      product.props = <any>{ product: { a: 'b' } };
      product.state = <any>{ c: 'd' };

      product.init();

      expect(product.state).to.eql({ a: 'b', c: 'd' });
    });
  });
});
