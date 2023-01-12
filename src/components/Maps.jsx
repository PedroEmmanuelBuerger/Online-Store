import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
              <Link
                to={ {
                  path: '/product',
                  state: { product },
                } }
              >
                <ProductCard
                  id={ product.id }
                  title={ product.title }
                  thumbnail={ product.thumbnail }
                  price={ product.price }
                />
              </Link>

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
