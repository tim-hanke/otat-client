import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";
import { Button, Input, Required } from "../Utils/Utils";

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  handleSubmit = async (ev) => {
    ev.preventDefault();
    const { email, phone, password } = ev.target;

    this.setState({ error: null });

    try {
      const user = await AuthApiService.postUser({
        email: email.value,
        phone: phone.value,
        password: password.value,
      });
      const res = await AuthApiService.postLogin({
        ...user,
        password: password.value,
      });
      TokenService.saveAuthToken(res.authToken);
      email.value = "";
      phone.value = "";
      password.value = "";
      this.props.onRegistrationSuccess();
    } catch (err) {
      this.setState({ error: err.error });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <div className="email">
          <label htmlFor="RegistrationForm__email">
            Email <Required />
          </label>
          <Input
            name="email"
            type="email"
            required
            id="RegistrationForm__email"
          ></Input>
        </div>
        <div className="phone">
          <label htmlFor="RegistrationForm__phone">
            Phone Number <Required />
          </label>
          <Input
            name="phone"
            type="tel"
            required
            id="RegistrationForm__phone"
          ></Input>
        </div>
        <div className="password">
          <label htmlFor="RegistrationForm__password">
            Password <Required />
          </label>
          <Input
            name="password"
            type="password"
            required
            id="RegistrationForm__password"
          ></Input>
        </div>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <Button type="submit">Register</Button>
      </form>
    );
  }
}
