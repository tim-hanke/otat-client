import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

export default class Header extends Component {
  render() {
    return (
      <>
        <nav className="Header">
          <h1>
            <Link to="/">
              <FontAwesomeIcon className="blue jiggly logo" icon={faBookOpen} />{" "}
              One Thing About Today
            </Link>
          </h1>
        </nav>
      </>
    );
  }
}
