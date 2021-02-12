import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import ArticleApiService from "../../services/article-api-service";
import "./ArticleListItem.css";
import ArticleListContext from "../../contexts/ArticleListContext";

export default class ArticleListItem extends Component {
  static contextType = ArticleListContext;

  state = { error: null };

  handleClickDelete = async () => {
    const { id } = this.props.article;

    try {
      await ArticleApiService.deleteUserArticle(id);
      ArticleApiService.getArticles()
        .then(this.context.setArticleList)
        .catch(this.context.setError);
      this.setState({ error: null });
    } catch (res) {
      this.setState({ error: res.error });
    }
  };

  render() {
    const { article } = this.props;
    const { error } = this.state;

    return (
      <div className="ArticleListItem__container">
        <Link
          to={{
            pathname: article.url,
          }}
          target="_blank"
          className="ArticleListItem"
          rel="noopener noreferrer"
        >
          <div
            className="ArticleListItem__image"
            style={{ backgroundImage: `url(${article.image})` }}
          />

          <div className="ArticleListItem__details">
            <div className="ArticleListItem__text">
              <h2 className="ArticleListItem__title">{article.title}</h2>
              <p className="ArticleListItem__description">
                {truncate(article.description)}
              </p>
            </div>
          </div>
          {error && (
            <div role="alert">
              <p>{error}</p>
            </div>
          )}
        </Link>
        <button
          className="ArticleListItem__delete jiggly"
          onClick={this.handleClickDelete}
          aria-label="delete button"
          title="delete button"
        >
          <FontAwesomeIcon className="logo" icon={faTrashAlt} />
        </button>
      </div>
    );
  }
}

function truncate(text) {
  const words = text.split(" ");

  if (words.length > 40) {
    return words.slice(0, 40).join(" ") + " ...";
  }

  return text;
}
