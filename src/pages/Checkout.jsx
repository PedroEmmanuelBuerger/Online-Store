import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';

export default class Checkout extends Component {
  state = {
    allProducts: [],
    Name: '',
    Email: '',
    Cpf: '',
    Phone: '',
    Cep: '',
    Adress: '',
    Payment: '',
    checkButton: false,
    error: false,
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const products = localStorage.getItem('cartProducts');
    const bool = products ? JSON.parse(products) : [];
    this.setState(() => ({
      allProducts: bool,
    }));
  };

  handleChang = async ({ target }) => {
    const { id, value } = target;
    await this.setState(() => ({
      [id]: value,
    }));
    this.checkButton();
  };

  checkButton = () => {
    const { Name, Email, Cpf, Phone, Cep, Adress, Payment } = this.state;
    const validName = Name.length > 0;
    const validEmail = Email.length > 0;
    const validCpf = Cpf.length > 0;
    const validPhone = Phone.length > 0;
    const validCep = Cep.length > 0;
    const validAdress = Adress.length > 0;
    const validPayment = Payment.length > 0;
    const bool = (validName && validEmail
         && validCpf && validPhone && validCep && validAdress && validPayment);
    this.setState(() => ({
      checkButton: bool,
    }));
  };

  attPage = () => {
    const { checkButton } = this.state;
    const { history } = this.props;
    if (!checkButton) {
      return this.setState(() => ({
        error: true,
      }));
    }
    this.setState(() => ({
      error: false,
    }));
    localStorage.removeItem('cartProducts');
    history.push('/');
  };

  render() {
    const { allProducts, error } = this.state;
    return (
      <div>
        {allProducts.length > 0
          ? (
            <div>
              <section>
                <h4>Revise seus produtos:</h4>
                {allProducts.map((element, index) => (
                  <div key={ index }>
                    <h4>{element.name}</h4>
                    <h4>{`R$:${element.price}`}</h4>
                  </div>
                ))}
              </section>
              <form>
                <label htmlFor="name">
                  Nome completo:
                  <input
                    type="text"
                    data-testid="checkout-fullname"
                    id="Name"
                    onChange={ this.handleChang }
                  />
                </label>
                <label htmlFor="email">
                  Email:
                  <input
                    type="email"
                    data-testid="checkout-email"
                    id="Email"
                    onChange={ this.handleChang }
                  />
                </label>
                <label htmlFor="Cpf">
                  Cpf:

                  <input
                    type="text"
                    data-testid="checkout-cpf"
                    id="Cpf"
                    onChange={ this.handleChang }
                  />
                </label>
                <label htmlFor="telefone">
                  Telefone:
                  <input
                    type="text"
                    data-testid="checkout-phone"
                    id="Phone"
                    onChange={ this.handleChang }
                  />
                </label>
                <label htmlFor="cep">
                  Cep:
                  <input
                    type="text"
                    data-testid="checkout-cep"
                    id="Cep"
                    onChange={ this.handleChang }
                  />
                </label>
                <label htmlFor="endereco">
                  Endereço:
                  <input
                    type="text"
                    data-testid="checkout-address"
                    id="Adress"
                    onChange={ this.handleChang }
                  />
                </label>
                <label htmlFor="pagamento">
                  <input
                    type="radio"
                    value="Boleto"
                    data-testid="ticket-payment"
                    name="Payment"
                    id="Payment"
                    onClick={ this.handleChang }
                  />
                  Boleto
                  <input
                    type="radio"
                    value="Visa"
                    name="Payment"
                    data-testid="visa-payment"
                    id="Payment"
                    onClick={ this.handleChang }
                  />
                  Visa
                  <input
                    type="radio"
                    value="Master Card"
                    name="Payment"
                    data-testid="master-payment"
                    id="Payment"
                    onClick={ this.handleChang }
                  />
                  Master Card
                  <input
                    type="radio"
                    value="Elo"
                    name="Payment"
                    data-testid="elo-payment"
                    id="Payment"
                    onClick={ this.handleChang }
                  />
                  Elo
                </label>
                <button
                  type="submit"
                  data-testid="checkout-btn"
                  onClick={ (e) => {
                    e.preventDefault();
                    this.attPage();
                  } }
                >
                  Finalizar compra
                </button>
              </form>
              {error ? (
                <p data-testid="error-msg"> Campos inválidos </p>
              ) : ''}
            </div>
          ) : '' }
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape([object]).isRequired,
};
