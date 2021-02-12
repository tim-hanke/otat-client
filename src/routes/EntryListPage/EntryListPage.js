import React, { Component } from "react";
import ArticleListContext from "../../contexts/ArticleListContext";
import ArticleApiService from "../../services/article-api-service";
import { Section } from "../../components/Utils/Utils";
import ArticleListItem from "../../components/ArticleListItem/ArticleListItem";
import "./EntryListPage.css";

export default class EntryListPage extends Component {
  static contextType = ArticleListContext;

  componentDidMount() {
    this.context.clearError();
    ArticleApiService.getArticles()
      .then(this.context.setArticleList)
      .catch(this.context.setError);
  }

  renderArticles() {
    const { articleList = [] } = this.context;
    return articleList
      .sort((a, b) => (a.id < b.id ? 1 : -1))
      .map((article) => <ArticleListItem key={article.id} article={article} />);
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