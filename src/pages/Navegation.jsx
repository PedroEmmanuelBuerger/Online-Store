import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Navegation extends Component {
  render() {
    const { name } = this.props;
    return (
      <p>
        <label htmlFor={ name }>
          <input
            name="category"
            id={ name }
            value={ name }
            data-testid="category"
            type="radio"
          />
          { name }
        </label>
      </p>
    );
  }
}

Navegation.propTypes = {
  name: propTypes.string.isRequired,
};
