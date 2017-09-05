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
        expect(product.state.persistent).to.eq(0);
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

      describe('onSelect()', () => {
        it('should revert back to persistent selection', () => {
          const set = product.set = spy();
          const oldVariant = { a: 'b' };
          product.state.persistent = 1;
          product.props.product = {
            data: {},
            variants: [{ c: 'd' }, oldVariant]
          };

          product.state.onSelect(-1);

          expect(set).to.be.calledWith({ selected: oldVariant });
        });

        it('should set to new selection', () => {
          const set = product.set = spy();
          const newVariant = { a: 'b' };
          product.props.product = {
            data: {},
            variants: [{ c: 'd' }, newVariant]
          };

          product.state.onSelect(1);

          expect(set).to.be.calledWith({ selected: newVariant });
        });

        it('should set to new selection and set persistent', () => {
          const set = product.set = spy();
          const newVariant = { a: 'b' };
          const index = 1;
          product.props.product = {
            data: {},
            variants: [{ c: 'd' }, newVariant]
          };

          product.state.onSelect(index, true);

          expect(set).to.be.calledWith({ selected: newVariant, persistent: index });
        });
      });
    });
  });

  describe('init()', () => {
    it('should mixin product to state', () => {
      const field = 'eyy';
      product.props = <any>{ product: { a: 'b' }, field };
      product.state = <any>{ c: 'd' };

      product.init();

      expect(product.state).to.eql({ a: 'b', c: 'd', field });
    });
  });

  describe('onUpdate()', () => {
    it('should update state and alias', () => {
      const state = <any>{ a: 'b', data: { ayy: 'lmao' } };
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

    it('should update data to selected', () => {
      const selected = { ye: 'boy' };
      const state = <any>{ a: 'b', data: { ayy: 'lmao' }, selected };
      const productStuff = { c: 'd' };
      const updateAlias = spy();
      const newState = { ...state, ...productStuff, data: selected };
      product.state = state;
      product.props = <any>{
        product: productStuff
      };
      product.updateAlias = updateAlias;
      product.onUpdate();

      expect(product.state).to.eql(newState);
      expect(updateAlias).to.be.calledWith('product', newState);
    });
  });
});
