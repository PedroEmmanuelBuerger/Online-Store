import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';

export default class Cart extends Component {
  render() {
    const { history } = this.props;
    return (
      <section>
        <button
          type="button"
          onClick={ () => history.push('/ShoppingCart') }
          data-testid="shopping-cart-button"
        >
          Carrinho de compras
        </button>
      </section>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.shape([object]).isRequired,
};
