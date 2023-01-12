import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';

export default class Product extends Component {
  state = {
    products: [],
  };

  render() {
    const { products } = this.state;
    const { match: { params: { id } } } = this.props;
    console.log(id);
    console.log(products);
    return (
      <div>oi Product</div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape([object]).isRequired,
};
