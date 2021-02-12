import React, { Component } from "react";
import AddArticleForm from "../../components/AddArticleForm/AddArticleForm";
import { Section } from "../../components/Utils/Utils";

export default class AddArticlePage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleAddSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/articles";
    history.push(destination);
  };

  render() {
    return (
      <Section className="AddArticlePage">
        <h2>Add Article</h2>
        <AddArticleForm onAddSuccess={this.handleAddSuccess} />
      </Section>
    );
  }
}
