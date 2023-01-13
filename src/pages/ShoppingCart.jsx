import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
    length0: false,
    // qtdProduct: 0,
  };

  componentDidMount() {
    this.getSavedCart();
  }

  getSavedCart = () => {
    // const { cartItems } = this.state;
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
    // return cartProducts ? JSON.parse(cartProducts) : [];
  };

  render() {
    const { cartItems, length0 } = this.state;
    return (
      <div>
        { length0 ? (
          <p data-testid=" shopping-cart-empty-message"> Seu carrinho está vazio</p>
        ) : cartItems.map(
          (product, index) => (
            <section key={ index }>
              <h4 data-testid="shopping-cart-product-name">{ product.name }</h4>
              <img src={ product.image } alt="Imagem do produto" />
              <h3>{ product.price }</h3>
              <p data-testid="shopping-cart-product-quantity">QTD: 1</p>
            </section>),
        )}
      </div>
    );
  }
}

export default ShoppingCart;
