import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormAvaliation extends Component {
  state = {
    ratting: '',
    email: '',
    text: '',
    arrayOfAvaliations: [],
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
    const bool = (emailbool && ratting.length > 0);
    this.setState(() => ({
      buttonValidation: !bool,
    }));
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
  };

  saveAvaliation = async () => {
    const { ratting, email, text } = this.state;
    this.setState(() => ({
      email: '',
      text: '',
    }));
    const avaliationObj = { email, text, ratting };
    await this.setState(() => ({
      arrayOfAvaliations: [avaliationObj],
    }));
    this.attStage();
  };

  attStage = () => {
    const { id } = this.props;
    const savedCards = this.getLocalStorage();
    const { arrayOfAvaliations } = this.state;
    const newArray = [...savedCards, ...arrayOfAvaliations];
    localStorage.setItem(id, JSON.stringify(newArray));
    this.setState(() => ({
      newArray,
    }));
  };

  render() {
    const { buttonValidation, newArray, email, text } = this.state;
    const one = 1;
    const two = 2;
    const three = 3;
    const four = 4;
    const five = 5;
    const message = <p data-testid="error-msg">Campos inválidos</p>;
    return (
      <div>
        <form onSubmit={ (e) => e.preventDefault() }>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="product-detail-email"
              name="email"
              onChange={ async (e) => {
                await this.handleChang(e);
                this.checkbutton();
              } }
              value={ email }
            />
          </label>
          <nav>
            <label htmlFor="rating">
              <input
                name="ratting"
                type="radio"
                data-testid={ `${one}-rating` }
                id={ one }
                onClick={ async (e) => {
                  await this.handleChang(e);
                  this.checkbutton();
                } }
                defaultValue={ email }
              />
              1
              <input
                name="ratting"
                type="radio"
                data-testid={ `${two}-rating` }
                id={ two }
                onClick={ async (e) => {
                  await this.handleChang(e);
                  this.checkbutton();
                } }
              />
              2
              <input
                name="ratting"
                type="radio"
                data-testid={ `${three}-rating` }
                id={ three }
                onClick={ async (e) => {
                  await this.handleChang(e);
                  this.checkbutton();
                } }
              />
              3
              <input
                name="ratting"
                type="radio"
                data-testid={ `${four}-rating` }
                id={ four }
                onClick={ async (e) => {
                  await this.handleChang(e);
                  this.checkbutton();
                } }
              />
              4
              <input
                name="ratting"
                type="radio"
                data-testid={ `${five}-rating` }
                id={ five }
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
