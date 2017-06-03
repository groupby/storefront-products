import * as storefront from '@storefront/core';
import * as mock from 'mock-require';
import * as sinon from 'sinon';

sinon.stub(storefront, 'view');

mock('../src/product/index.html', {});
mock('../src/products/index.html', {});
mock('../src/simple-card/index.html', {});
