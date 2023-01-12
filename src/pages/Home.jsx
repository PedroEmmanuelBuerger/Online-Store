import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import { getQuery, getCategories, getProductById } from '../services/api';
import Navegation from './Navegation';
import Maps from '../components/Maps';

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

  render() {
    const { history } = this.props;
    const { categories, products, error } = this.state;
    return (
      <div>
        <nav className="lateral">
          { categories
            .map((category) => (<Navegation
              key={ category.id }
              id={ category.id }
              name={ category.name }
              onClick={ this.getClickRadio }
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
            onClick={ this.getClickSearch }
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
          <Maps products={ products } />
        )}
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape([object]).isRequired,
};
