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
    const { full_name, user_name, password } = ev.target;

    this.setState({ error: null });

    try {
      const user = await AuthApiService.postUser({
        full_name: full_name.value,
        user_name: user_name.value,
        password: password.value,
      });
      const res = await AuthApiService.postLogin({
        ...user,
        password: password.value,
      });
      TokenService.saveAuthToken(res.authToken);
      full_name.value = "";
      user_name.value = "";
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
        <div className="full_name">
          <label htmlFor="RegistrationForm__full_name">
            Full name <Required />
          </label>
          <Input
            name="full_name"
            type="text"
            required
            id="RegistrationForm__full_name"
          ></Input>
        </div>
        <div className="user_name">
          <label htmlFor="RegistrationForm__user_name">
            User name/email <Required />
          </label>
          <Input
            name="user_name"
            type="text"
            required
            id="RegistrationForm__user_name"
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
