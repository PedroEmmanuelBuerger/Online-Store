import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import Cart from '../components/Cart';
import { getId } from '../services/api';
import FormAvaliation from './FormAvaliation';

export default class Product extends Component {
  state = {
    productData: [],
    numberOfLength: 0,
  };

  componentDidMount() {
    this.fetchProduct();
    this.attLocalStorage();
  }

  attLocalStorage = async () => {
    const products = localStorage.getItem('cartProducts');
    const bool = products ? JSON.parse(products) : [];
    await this.setState(() => ({
      numberOfLength: bool.length,
    }));
    localStorage.setItem('CartProductQuantity', bool.length);
  };

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

  getClick = (product) => {
    const image = product.thumbnail;
    const name = product.title;
    const { price } = product;
    const avalqat = product.available_quantity;
    const quantity = 1;
    const cartProducts = this.getSavedCart();
    const newCartProducts = [...cartProducts, { name, price, image, quantity, avalqat }];
    localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
  };

  render() {
    const { history, match } = this.props;
    const id = match.params;
    const { productData, numberOfLength } = this.state;

    return (
      <section>
        <h3 data-testid="product-detail-name">{ productData.title }</h3>
        <img
          data-testid="product-detail-image"
          src={ productData.thumbnail }
          alt="Imagem do produto"
        />
        <h4 data-testid="product-detail-price">{ productData.price }</h4>
        {(productData.attributes) ? (
          <ul>
            { productData.attributes.map((attribute, index) => (
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
          onClick={ () => {
            this.getClick(productData);
            this.attLocalStorage();
          } }
          type="button"
        >
          +
        </button>
        <Cart history={ history } numberOfLength={ numberOfLength } />
        <FormAvaliation id={ id.id } />
      </section>
    );
  }
}

Product.propTypes = {
  history: PropTypes.shape([object]).isRequired,
  match: PropTypes.shape([object]).isRequired,
};
