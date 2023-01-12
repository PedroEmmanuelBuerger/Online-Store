import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Navegation extends Component {
  render() {
    const { name, id, onClick } = this.props;
    return (
      <p>
        <label htmlFor={ name }>
          <input
            onClick={ onClick }
            name="category"
            id={ id }
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
  id: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};
