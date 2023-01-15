import PropTypes, { object } from 'prop-types';
import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
    length0: false,
  };

  componentDidMount() {
    this.getSavedCart();
  }

  getSavedCart = () => {
    const cartProducts = localStorage.getItem('cartProducts');
    let cartItemsLocal = JSON.parse(cartProducts);
    if (cartItemsLocal === null) {
      cartItemsLocal = [];
    }
    this.setState({
      cartItems: cartItemsLocal,
      length0: false,
    });
    if (cartItemsLocal.length === 0) {
      this.setState({
        length0: true,
      });
    }
  };

  addQuantity = ({ target }) => {
    const { cartItems } = this.state;
    const item = cartItems.find((product) => product.name === target.name);
    if (item.quantity < item.avalqat) {
      item.quantity += 1;
    }
    this.setState({
      cartItems: [...cartItems],
    });
    localStorage.setItem('cartProducts', JSON.stringify(cartItems));
  };

  removeQuantity = ({ target }) => {
    const { cartItems } = this.state;
    const item = cartItems.find((product) => product.name === target.name);

    if (item.quantity > 1) {
      item.quantity -= 1;
    }
    this.setState({
      cartItems: [...cartItems],
    });
    localStorage.setItem('cartProducts', JSON.stringify(cartItems));
  };

  eraseItemCart = ({ target }) => {
    const { cartItems } = this.state;
    const item = cartItems.find((product) => product.name === target.name);
    const filtered = cartItems.filter((element) => element !== item);
    this.setState(() => ({
      cartItems: filtered,
    }));
    localStorage.setItem('cartProducts', JSON.stringify(filtered));
  };

  render() {
    const { cartItems, length0 } = this.state;
    const { history } = this.props;
    return (
      <div>
        { length0 ? (
          <p data-testid=" shopping-cart-empty-message"> Seu carrinho está vazio</p>
        ) : cartItems.map(
          (product, index) => (
            <section key={ index }>
              <h4 data-testid="shopping-cart-product-name">{ product.name }</h4>
              <button
                name={ product.name }
                type="button"
                data-testid="remove-product"
                onClick={ (e) => {
                  this.eraseItemCart(e);
                } }
              >
                X

              </button>
              <img src={ product.image } alt="Imagem do produto" />
              <h3>{ product.price }</h3>
              <button
                name={ product.name }
                type="button"
                data-testid="product-increase-quantity"
                onClick={ (e) => this.addQuantity(e) }
              >
                +

              </button>
              <button
                name={ product.name }
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ (e) => this.removeQuantity(e) }
              >
                -

              </button>
              <p data-testid="shopping-cart-product-quantity">
                { (!product.quantity) ? 1 : product.quantity }
              </p>
            </section>),
        )}
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ () => history.push('/Checkout') }
        >
          Finalizar compra
        </button>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.shape([object]).isRequired,
};

export default ShoppingCart;
