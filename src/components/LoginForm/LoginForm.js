import React, { Component } from "react";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import { Button, Input } from "../Utils/Utils";

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  state = { error: null };

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { email, password } = ev.target;

    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        email.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((err) => {
        this.setState({ error: err.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <p>Demo account: demo@test.com/Pass123!</p>
        <div className="email">
          <label htmlFor="LoginForm__email">Email</label>
          <Input
            required
            type="email"
            name="email"
            id="LoginForm__email"
            placeholder="demo@test.com"
          ></Input>
        </div>
        <div className="password">
          <label htmlFor="LoginForm__password">Password</label>
          <Input
            required
            name="password"
            type="password"
            id="LoginForm__password"
            placeholder="Pass123!"
          ></Input>
        </div>
        {error && (
          <div role="alert">
            <p className="red">{error}</p>
          </div>
        )}
        <Button type="submit">Login</Button>
      </form>
    );
  }
}
