import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import Cart from '../components/Cart';

export default class Product extends Component {
  render() {
    const { product, history } = this.props;
    console.log(product);
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
        <Cart history={ history } />
      </section>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape([object]).isRequired,
};
