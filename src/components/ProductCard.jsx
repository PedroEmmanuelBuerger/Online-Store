import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const { id, title, thumbnail, price, shipping } = this.props;
    return (
      <section id={ id } data-testid="product">
        <Link
          to={ `/product/${id}` }
          data-testid="product-detail-link"
        >
          <h6>
            { title }
          </h6>
        </Link>
        <img
          src={ thumbnail }
          alt="imagem-do-produto"
        />
        <p>{ price }</p>
        {shipping.free_shipping === true ? (
          <p data-testid="free-shipping">Frete Grátis</p>
        )
          : ''}
      </section>
    );
  }
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  shipping: PropTypes.shape([object]).isRequired,
};
