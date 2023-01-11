import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { id, title, thumbnail, price } = this.props;
    return (
      <section id={ id } data-testid="product">
        <h6>
          { title }
        </h6>
        <img src={ thumbnail } alt="imagem-do-produto" />
        <p>{ price }</p>
      </section>
    );
  }
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
