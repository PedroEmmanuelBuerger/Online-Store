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

  handleChang = ({ target }) => {
    const { id, value } = target;
    this.setState(() => ({
      [id]: value,
    }));
  };

  attPage = () => {
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
    const { history } = this.props;
    if (!bool) {
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
                    onChange={ async (e) => {
                      await this.handleChang(e);
                    } }
                  />
                </label>
                <label htmlFor="email">
                  Email:
                  <input
                    type="email"
                    data-testid="checkout-email"
                    id="Email"
                    onChange={ async (e) => {
                      await this.handleChang(e);
                    } }
                  />
                </label>
                <label htmlFor="Cpf">
                  Cpf:

                  <input
                    type="text"
                    data-testid="checkout-cpf"
                    id="Cpf"
                    onChange={ async (e) => {
                      await this.handleChang(e);
                    } }
                  />
                </label>
                <label htmlFor="telefone">
                  Telefone:
                  <input
                    type="text"
                    data-testid="checkout-phone"
                    id="Phone"
                    onChange={ async (e) => {
                      await this.handleChang(e);
                    } }
                  />
                </label>
                <label htmlFor="cep">
                  Cep:
                  <input
                    type="text"
                    data-testid="checkout-cep"
                    id="Cep"
                    onChange={ async (e) => {
                      await this.handleChang(e);
                    } }
                  />
                </label>
                <label htmlFor="endereco">
                  Endereço:
                  <input
                    type="text"
                    data-testid="checkout-address"
                    id="Adress"
                    onChange={ async (e) => {
                      await this.handleChang(e);
                    } }
                  />
                </label>
                <label htmlFor="pagamento">
                  <input
                    type="radio"
                    value="Boleto"
                    data-testid="ticket-payment"
                    name="Payment"
                    id="Payment"
                    onChange={ async (e) => {
                      await this.handleChang(e);
                    } }
                  />
                  Boleto
                  <input
                    type="radio"
                    value="Visa"
                    name="Payment"
                    data-testid="visa-payment"
                    id="Payment"
                    onChange={ async (e) => {
                      await this.handleChang(e);
                    } }
                  />
                  Visa
                  <input
                    type="radio"
                    value="Master Card"
                    name="Payment"
                    data-testid="master-payment"
                    id="Payment"
                    onChange={ async (e) => {
                      await this.handleChang(e);
                    } }
                  />
                  Master Card
                  <input
                    type="radio"
                    value="Elo"
                    name="Payment"
                    data-testid="elo-payment"
                    id="Payment"
                    onChange={ async (e) => {
                      await this.handleChang(e);
                    } }
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
              ) : ('')}
            </div>
          ) : '' }
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape([object]).isRequired,
};
