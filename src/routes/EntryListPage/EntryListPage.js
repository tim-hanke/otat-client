import React, { Component } from "react";
import ArticleListContext from "../../contexts/ArticleListContext";
import EntryApiService from "../../services/entry-api-service";
import { Section } from "../../components/Utils/Utils";
import EntryListItem from "../../components/EntryListItem/EntryListItem";
import "./EntryListPage.css";

export default class EntryListPage extends Component {
  static contextType = ArticleListContext;

  componentDidMount() {
    this.context.clearError();
    EntryApiService.getEntries()
      .then(this.context.setEntryList)
      .catch(this.context.setError);
  }

  renderArticles() {
    const { entryList = [] } = this.context;
    return entryList
      .sort((a, b) => (a.id < b.id ? 1 : -1))
      .map((article) => <EntryListItem key={article.id} article={article} />);
  }

  render() {
    const { error } = this.context;
    return (
      <Section list className="EntryListPage">
        {error ? (
          <p className="red">There was an error, try again</p>
        ) : (
          this.renderArticles()
        )}
      </Section>
    );
  }
}
