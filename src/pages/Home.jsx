import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { getQuery } from '../services/api';

export default class Home extends Component {
  state = {
    products: [],
    error: '',
    valueSearch: '',
  };

  componentDidMount() {

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
    const { products, error } = this.state;
    return (
      <>
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
      </>
    );
  }
}
