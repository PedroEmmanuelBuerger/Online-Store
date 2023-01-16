import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormAvaliation extends Component {
  state = {
    ratting: '',
    email: '',
    text: '',
    newArray: [],
    buttonValidation: false,
  };

  async componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const { id } = this.props;
    const cards = localStorage.getItem(id);
    const bool = cards ? JSON.parse(cards) : [];
    this.setState(() => ({
      newArray: bool,
    }));
    return bool;
  };

  checkbutton = () => {
    const { email, ratting } = this.state;
    const emailVali = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const emailbool = emailVali.test(email);
    const bool = !(emailbool && ratting);
    this.setState(() => ({
      buttonValidation: bool,
    }));
    return bool;
  };

  handleChang = ({ target }) => {
    const { name, value, id } = target;
    if (target.checked) {
      return this.setState(() => ({
        [name]: id,
      }));
    }
    this.setState(() => ({
      [name]: value,
    }));
    this.checkbutton();
  };

  saveAvaliation = (event) => {
    event.preventDefault();
    const { ratting, email, text } = this.state;
    const bool = this.checkbutton();
    if (bool) {
      return;
    }
    this.setState(() => ({
      email: '',
      text: '',
      buttonValidation: true,
    }));
    const { id } = this.props;
    const savedCards = this.getLocalStorage();
    const newArray = [...savedCards, { email, text, ratting }];
    localStorage.setItem(id, JSON.stringify(newArray));
    this.setState(() => ({
      newArray,
      buttonValidation: false,
    }));
  };

  render() {
    const { newArray, email, text, buttonValidation } = this.state;
    const message = <p data-testid="error-msg">Campos inválidos</p>;
    return (
      <div>
        <form>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="product-detail-email"
              name="email"
              value={ email }
              onChange={ async (e) => {
                await this.handleChang(e);
                this.checkbutton();
              } }
            />
          </label>
          <nav>
            <label htmlFor="rating">
              <input
                name="ratting"
                type="radio"
                data-testid="1-rating"
                id={ 1 }
                onClick={ async (e) => {
                  await this.handleChang(e);
                  this.checkbutton();
                } }
              />
              1
              <input
                name="ratting"
                type="radio"
                data-testid="2-rating"
                id={ 2 }
                onClick={ async (e) => {
                  await this.handleChang(e);
                  this.checkbutton();
                } }
              />
              2
              <input
                name="ratting"
                type="radio"
                data-testid="3-rating"
                id={ 3 }
                onClick={ async (e) => {
                  await this.handleChang(e);
                  this.checkbutton();
                } }
              />
              3
              <input
                name="ratting"
                type="radio"
                data-testid="4-rating"
                id={ 4 }
                onClick={ async (e) => {
                  await this.handleChang(e);
                  this.checkbutton();
                } }
              />
              4
              <input
                name="ratting"
                type="radio"
                data-testid="5-rating"
                id={ 5 }
                onClick={ async (e) => {
                  await this.handleChang(e);
                  this.checkbutton();
                } }
              />
              5
            </label>
          </nav>
          <label htmlFor="comments">
            <textarea
              rows="4"
              cols="50"
              data-testid="product-detail-evaluation"
              placeholder="Mensagem(Opcional)"
              name="text"
              onChange={ this.handleChang }
              value={ text }
            />
          </label>
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.saveAvaliation }
          >
            Enviar
          </button>
          { buttonValidation && message}
        </form>
        {newArray.map((element, index) => (
          <section key={ index }>
            <h3 data-testid="review-card-email">{element.email}</h3>
            <h4 data-testid="review-card-evaluation">{element.text}</h4>
            <h4 data-testid="review-card-rating">{element.ratting}</h4>
          </section>)) }
      </div>
    );
  }
}

FormAvaliation.propTypes = {
  id: PropTypes.string.isRequired,
};
