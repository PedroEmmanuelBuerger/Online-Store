import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
    // qtdProduct: 0,
  };

  componentDidMount() {
    this.getSavedCart();
  }

  getSavedCart = () => {
    // const { cartItems } = this.state;
    const cartProducts = localStorage.getItem('cartProducts');
    const cartItems = JSON.parse(cartProducts);
    console.log(cartItems);
    this.setState({
      cartItems,
    });
    // return cartProducts ? JSON.parse(cartProducts) : [];
  };

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        { cartItems.length === 0 ? (
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
