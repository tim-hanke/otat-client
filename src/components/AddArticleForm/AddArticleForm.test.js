import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import AddArticleForm from "./AddArticleForm";

describe.only("AddArticleForm component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AddArticleForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected", () => {
    const tree = renderer.create(<AddArticleForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
