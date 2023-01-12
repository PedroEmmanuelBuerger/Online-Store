import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';
import { getQuery, getCategories } from '../services/api';
import Navegation from './Navegation';

export default class Home extends Component {
  state = {
    categories: [],
    products: [],
    error: '',
    valueSearch: '',
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  getClick = async () => {
    const { valueSearch } = this.state;
    const { results } = await getQuery(valueSearch);

    if (results.length === 0) {
      this.setState({
        error: 'Nenhum produto foi encontrado',
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

  render() {
    const { history } = this.props;
    const { categories, products, error } = this.state;
    return (
      <div>
        <nav className="lateral">
          { categories
            .map((category) => (<Navegation
              key={ category.id }
              name={ category.name }
            />)) }
        </nav>
        <section>
          <button
            type="button"
            onClick={ () => history.push('/ShoppingCart') }
            data-testid="shopping-cart-button"
          >
            Carrinho de compras
          </button>
        </section>
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
            onClick={ this.getClick }
          >
            Procura
          </button>
        </form>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        { error.length > 0 ? (
          <p>{error}</p>
        ) : (
          <div>
            {
              products.map((product) => (
                <div key={ product.id }>
                  <ProductCard
                    id={ product.id }
                    title={ product.title }
                    thumbnail={ product.thumbnail }
                    price={ product.price }
                  />
                </div>
              ))
            }
          </div>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};
