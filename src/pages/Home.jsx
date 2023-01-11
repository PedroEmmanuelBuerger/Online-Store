import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import Navegation from './Navegation';

export default class Home extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  render() {
    const { categories } = this.state;
    const { history } = this.props;

    return (
      <div>
        <nav className="lateral">
          { categories
            .map((category) => (<Navegation
              key={ category.id }
              name={ category.name }
            />)) }
        </nav>

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <section>
          <button
            type="button"
            onClick={ () => history.push('/ShoppingCart') }
            data-testid="shopping-cart-button"
          >
            Carrinho de compras
          </button>
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};
