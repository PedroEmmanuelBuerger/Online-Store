import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import Cart from '../components/Cart';
import { getId } from '../services/api';

export default class Product extends Component {
  state = {
    productData: [],
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const product = await getId(id);
    this.setState(() => ({
      productData: product,
    }));
  };

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
    const { history } = this.props;
    const { productData } = this.state;
    const { thumbnail, title, price, attributes } = productData;
    return (
      <section>
        <h3>{ title }</h3>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt="Imagem do produto"
        />
        <h4 data-testid="product-detail-price">{ price }</h4>
        {(attributes) ? (
          <ul>
            { attributes.map((attribute, index) => (
              <li key={ index }>
                <p>
                  {` ${attribute.name} ${attribute.value_name} `}
                </p>
              </li>
            )) }
          </ul>
        )
          : ''}
        {}
        <button
          data-testid="product-detail-add-to-cart"
          onClick={
            () => this.getClick(title, price, thumbnail)
          }
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
  history: PropTypes.shape([object]).isRequired,
  match: PropTypes.shape([object]).isRequired,
};
