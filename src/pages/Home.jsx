import React, { Component } from 'react';
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
      </div>
    );
  }
}
