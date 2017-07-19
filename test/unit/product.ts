import Product from '../../src/product';
import suite from './_suite';

suite('Product', ({ expect, spy, itShouldBeConfigurable, itShouldHaveAlias }) => {
  let product: Product;

  beforeEach(() => product = new Product());

  itShouldBeConfigurable(Product);
  itShouldHaveAlias(Product, 'product');

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

      describe('onClick()', () => {
        it('should call flux.details with id and title', () => {
          const id = '123';
          const title = 'idk';
          const details = spy();
          product.state.data = { id, title };
          product.flux = <any>{
            details
          };

          product.state.onClick();

          expect(details).to.be.calledWith(id, title);
        });
      });
    });
  });

  describe('init()', () => {
    it('should mixin product to state', () => {
      product.props = <any>{ product: { a: 'b' } };
      product.state = <any>{ c: 'd' };

      product.init();

      expect(product.state).to.eql({ a: 'b', c: 'd' });
    });
  });

  describe('onUpdate()', () => {
    it('should update state and alias', () => {
      const state = <any>{ a: 'b' };
      const productStuff = { c: 'd' };
      const updateAlias = spy();
      const newState = { ...state, ...productStuff };
  product.state = state;
  product.props = <any>{
    product: productStuff
  };
  product.updateAlias = updateAlias;
  product.onUpdate();

  expect(product.state).to.eql(newState);
  expect(updateAlias).to.be.calledWith('product', newState);
});
  })
});
