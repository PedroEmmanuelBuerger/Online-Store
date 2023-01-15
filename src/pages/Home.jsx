import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import { Link } from 'react-router-dom';
import { getQuery, getCategories, getProductById } from '../services/api';
import Navegation from './Navegation';
import Cart from '../components/Cart';
import ProductCard from '../components/ProductCard';

export default class Home extends Component {
  state = {
    categories: [],
    products: [],
    error: '',
    valueSearch: '',
    numberOfLength: 0,
  };

  componentDidMount() {
    this.getCateg();
    this.attLocalStorage();
  }

  getCateg = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  };

  attLocalStorage = async () => {
    const products = localStorage.getItem('cartProducts');
    const bool = products ? JSON.parse(products) : [];
    await this.setState(() => ({
      numberOfLength: bool.length,
    }));
    localStorage.setItem('CartProductQuantity', bool.length);
  };

  getClickSearch = async () => {
    const { valueSearch } = this.state;
    const { results } = await getQuery(valueSearch);

    this.setState({
      products: [],
      error: '',
    });
    if (results.length === 0) {
      this.setState({
        error: 'Nenhum produto foi encontrado',
        valueSearch: '',
      });
    }
    this.setState({
      products: results,

    });
  };

  getInput = async ({ target: { value } }) => {
    this.setState({
      valueSearch: value,
    });
  };

  getClickRadio = async ({ target: id }) => {
    const { results } = await getProductById(id.id);
    this.setState({
      products: [],
    });
    this.setState(() => ({
      products: results,
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
    const { history } = this.props;
    const { categories, products, error, numberOfLength } = this.state;
    return (
      <div>
        <header>
          <nav className="lateral">
            { categories
              .map((category) => (<Navegation
                key={ category.id }
                id={ category.id }
                name={ category.name }
                onClick={ this.getClickRadio }
              />)) }
          </nav>
          <Cart history={ history } numberOfLength={ numberOfLength } />
          <form>
            <label htmlFor="searchInput">
              <input
                type="text"
                name="searchInput"
                data-testid="query-input"
                onChange={ this.getInput }
              />
            </label>

            <button
              type="button"
              name="buttonSearch"
              data-testid="query-button"
              onClick={ this.getClickSearch }
            >
              Procura
            </button>
          </form>
        </header>
        <main>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          { error.length > 0 ? (
            <p>{error}</p>
          ) : (
            products.map((product) => (
              <div key={ product.id }>
                <Link
                  to={ `/product/${product.id}` }
                  data-testid="product-detail-link"
                >
                  <ProductCard
                    id={ product.id }
                    title={ product.title }
                    thumbnail={ product.thumbnail }
                    price={ product.price }
                  />
                </Link>
                <button
                  id={ product.id }
                  data-testid="product-add-to-cart"
                  onClick={ () => {
                    this.getClick(product);
                    this.attLocalStorage();
                  } }
                  type="button"
                >
                  +
                </button>

              </div>
            ))
          )}
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape([object]).isRequired,
};
