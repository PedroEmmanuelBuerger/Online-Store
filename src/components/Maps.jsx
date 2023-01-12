import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

export default class Maps extends Component {
  state = {
    // count: 0,
  };

  componentDidMount() {

  }

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
    const { products, getProductObject } = this.props;
    return (
      <div>
        {
          products.map((product) => (
            <div data-testid="product-detail-link" key={ product.id }>
              <Link
                to={ `/product/${product.id}` }
                onClick={ () => getProductObject(product) }
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
  getProductObject: PropTypes.func.isRequired,
};
