// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import ProductCard from './ProductCard';

// export default class Maps extends Component {
//   state = {
//     // count: 0,
//   };

//   getSavedCart = () => {
//     const cartProducts = localStorage.getItem('cartProducts');
//     return cartProducts ? JSON.parse(cartProducts) : [];
//   };

//   getClick = (product) => {
//     const image = product.thumbnail;
//     const name = product.title;
//     const { price } = product;
//     const avalqat = product.available_quantity;
//     const quantity = 1;
//     const cartProducts = this.getSavedCart();
//     const newCartProducts = [...cartProducts, { name, price, image, quantity, avalqat }];
//     localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
//   };

//   render() {
//     const { products } = this.props;
//     return (
//       <div>

//       </div>
//     );
//   }
// }

// Maps.propTypes = {
//   products: PropTypes.oneOfType([
//     PropTypes.array,
//   ]).isRequired,
// };
