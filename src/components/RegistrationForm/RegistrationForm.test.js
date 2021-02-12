import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import RegistrationForm from "./RegistrationForm";

describe("RegistrationForm component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RegistrationForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected", () => {
    const tree = renderer.create(<RegistrationForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
