import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

export default class Maps extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        {
          products.map((product) => (
            <div key={ product.id }>
              <ProductCard
                id={ product.id }
                title={ product.title }
                thumbnail={ product.thumbnail }
                price={ product.price }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

Maps.propTypes = {
  products: PropTypes.oneOfType([
    PropTypes.array,
  ]).isRequired,
};
