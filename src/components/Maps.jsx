import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default class Maps extends Component {
  state = {
    // count: 0,
  };

  getSavedCart = () => {
    const cartProducts = localStorage.getItem('cartProducts');
    return cartProducts ? JSON.parse(cartProducts) : [];
  };

  getClick = (name, price, image) => {
    const cartProducts = this.getSavedCart();
    const newCartProducts = [...cartProducts, { name, price, image }];
    localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
  };

  render() {
    const { products } = this.props;
    return (
      <div>
        {
          products.map((product) => (
            <div data-testid="product-detail-link" key={ product.id }>
              <Link
                to={ `/product/${product.id}` }
              >
                <ProductCard
                  id={ product.id }
                  title={ product.title }
                  thumbnail={ product.thumbnail }
                  price={ product.price }
                />
              </Link>
              <button
                data-testid="product-add-to-cart"
                onClick={
                  () => this.getClick(product.title, product.price, product.thumbnail)
                }
                type="button"
              >
                +
              </button>

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
