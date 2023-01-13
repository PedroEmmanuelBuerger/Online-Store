import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { id, title, thumbnail, price } = this.props;
    return (
      <section id={ id } data-testid="product">
        <h6 data-testid="product-detail-name">
          { title }
        </h6>
        <p data-testid="product-detail-price">{ price }</p>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt="imagem-do-produto"
        />
      </section>
    );
  }
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
