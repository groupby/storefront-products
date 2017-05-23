import { view, Component } from '@storefront/core';

@view('gb-products', require('./index.html'), require('./index.css'))
class Products extends Component {}

export default Products;
