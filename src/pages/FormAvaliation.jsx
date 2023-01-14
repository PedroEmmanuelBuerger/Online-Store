import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormAvaliation extends Component {
  state = {
    ratting: '',
    email: '',
    text: '',
    buttonValidation: false,
    rattingValidation: false,
    emailValidation: false,
    arrayOfAvaliations: [],
    error: false,
    newArray: [],
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
    const { rattingValidation, emailValidation } = this.state;
    const validation = (rattingValidation && emailValidation);
    this.setState(() => ({
      buttonValidation: validation,
    }));
  };

  validationRatting = async (rattings) => {
    await this.setState(() => ({
      rattingValidation: true,
      ratting: rattings.target.id,
    }));
    this.checkbutton();
  };

  getInputValue = async (inputvalue) => {
    const email = inputvalue.target.value;
    const emailVali = /\S+@\S+.\S+/;
    const emailbool = email.match(emailVali) !== null && email.length > 0;
    await this.setState(() => ({
      emailValidation: emailbool,
      email,
    }));
    this.checkbutton();
  };

  getMessegeValue = (inputvalue) => {
    this.setState(() => ({
      text: inputvalue.target.value,
    }));
  };

  saveAvaliation = async () => {
    const { ratting, email, text,
      buttonValidation } = this.state;
    this.setState(() => ({
      email: '',
      text: '',
    }));
    if (!buttonValidation) {
      return this.setState(() => ({
        error: true,
      }));
    }
    const avaliationObj = { email, text, ratting };
    await this.setState(() => ({
      arrayOfAvaliations: [avaliationObj],
      error: false,
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
    const { error, newArray, email, text } = this.state;
    const one = 1;
    const two = 2;
    const three = 3;
    const four = 4;
    const five = 5;
    return (
      <div>
        <form>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="product-detail-email"
              onChange={ (e) => {
                this.checkbutton();
                this.getInputValue(e);
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
                onClick={ (e) => {
                  this.checkbutton();
                  this.validationRatting(e);
                } }
              />
              1
              <input
                name="ratting"
                type="radio"
                data-testid={ `${two}-rating` }
                id={ two }
                onClick={ (e) => {
                  this.checkbutton();
                  this.validationRatting(e);
                } }
              />
              2
              <input
                name="ratting"
                type="radio"
                data-testid={ `${three}-rating` }
                id={ three }
                onClick={ (e) => {
                  this.checkbutton();
                  this.validationRatting(e);
                } }
              />
              3
              <input
                name="ratting"
                type="radio"
                data-testid={ `${four}-rating` }
                id={ four }
                onClick={ (e) => {
                  this.checkbutton();
                  this.validationRatting(e);
                } }
              />
              4
              <input
                name="ratting"
                type="radio"
                data-testid={ `${five}-rating` }
                id={ five }
                onClick={ (e) => {
                  this.checkbutton();
                  this.validationRatting(e);
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
              onChange={ this.getMessegeValue }
              value={ text }
            />
          </label>
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.saveAvaliation }
          >
            Enviar
          </button>
        </form>
        {error ? <p data-testid="error-msg">Campos inválidos</p> : ''}
        {newArray.map((element, index) => (
          <section key={ index }>
            <h3 data-testid="review-card-email">{element.email}</h3>
            <h4 data-testid="review-card-evaluation">{element.text}</h4>
            <h4 data-testid="review-card-evaluation">{element.ratting}</h4>
          </section>)) }

      </div>
    );
  }
}

FormAvaliation.propTypes = {
  id: PropTypes.string.isRequired,
};
