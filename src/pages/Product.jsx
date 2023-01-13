import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import Cart from '../components/Cart';

export default class Product extends Component {
  render() {
    const { product, history } = this.props;
    const { thumbnail, title, price, attributes } = product;
    return (
      <section>
        <h3>{ title }</h3>
        <img
          // data-testid="product-detail-image"
          src={ thumbnail }
          alt="Imagem do produto"
        />
        <h4>{ price }</h4>
        <ul>
          { attributes.map((attribute, index) => (
            <li key={ index }>
              <p>
                {` ${attribute.name} ${attribute.value_name} `}
              </p>
            </li>
          )) }
        </ul>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
        >
          +
        </button>
        <Cart history={ history } />
      </section>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape([object]).isRequired,
  history: PropTypes.shape([object]).isRequired,
};