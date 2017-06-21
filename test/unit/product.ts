import Product from '../../src/product';
import suite from './_suite';

suite('Product', ({ expect, spy }) => {
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
        it('should call build with state', () => {
          const id = '123';
          const title = 'idk';
          const build = spy();
          product.state.data = { id, title };
          product.services = <any>{
            url: {
              beautifier: {
                build
              }
            }
          };

          product.state.link();

          expect(build).to.be.calledWith('details', { id, title, variants: [] });
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
