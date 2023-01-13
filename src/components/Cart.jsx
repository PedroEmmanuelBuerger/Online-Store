import React, { Component } from 'react';
// import PropTypes, { object } from 'prop-types';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  render() {
    return (
      <Link to="/ShoppingCart">
        <button
          type="button"
          data-testid="shopping-cart-button"
        >
          Carrinho de compras
        </button>
      </Link>
    );
  }
}
