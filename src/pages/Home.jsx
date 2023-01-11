import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Home extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <section>
          <button
            type="button"
            onClick={ () => history.push('/ShoppingCart') }
            data-testid="shopping-cart-button"
          >
            Carrinho de compras
          </button>
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};
