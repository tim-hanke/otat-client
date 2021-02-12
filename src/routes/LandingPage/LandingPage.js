import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../../services/auth-api-service";
import { Section } from "../../components/Utils/Utils";
import "./LandingPage.css";
import TokenService from "../../services/token-service";

export default class LandingPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = { error: null };

  // I put in a button that one-click logs into the demo account
  // to reduce the friction of someone wanting to try out Marker Monkey
  handleDemoLogin = async () => {
    this.setState({ error: null });

    try {
      const res = await AuthApiService.postLogin({
        user_name: "demo",
        password: "Pass123!",
      });
      if (res.authToken) {
        TokenService.saveAuthToken(res.authToken);
      } else {
        throw new Error(res.error);
      }
      this.props.onLogin();
      const { location, history } = this.props;
      const destination = (location.state || {}).from || "/articles";
      history.push(destination);
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <Section className="LandingPage">
        <h2>
          A place to store all the things you just don't have time to read now.
        </h2>
        <Link to="/register">Register</Link>
        <p className="LandingPage__hint">
          Hint: you can also try out a demo account by clicking below!
        </p>
        <button className="LandingPage__login" onClick={this.handleDemoLogin}>
          Demo Login
        </button>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
      </Section>
    );
  }
}
