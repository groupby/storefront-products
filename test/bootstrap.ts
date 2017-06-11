import * as chai from 'chai';
import * as mock from 'mock-require';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

mock('../src/product/index.html', {});
mock('../src/products/index.html', {});
mock('../src/simple-card/index.html', {});
