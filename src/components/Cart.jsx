import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  render() {
    const { numberOfLength } = this.props;
    return (
      <div>
        <Link to="/ShoppingCart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Carrinho de compras
          </button>
        </Link>
        <p data-testid="shopping-cart-size">{numberOfLength}</p>
      </div>
    );
  }
}

Cart.propTypes = {
  numberOfLength: PropTypes.number.isRequired,
};
