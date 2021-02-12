import React, { Component } from "react";

export const nullArticle = {
  author: {},
  tags: [],
};

const ArticleContext = React.createContext({
  article: nullArticle,
  reviews: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setArticle: () => {},
  clearArticle: () => {},
  setReviews: () => {},
  addReview: () => {},
});

export default ArticleContext;

export class ArticleProvider extends Component {
  state = {
    article: nullArticle,
    error: null,
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setArticle = (article) => {
    this.setState({ article });
  };

  setReviews = (reviews) => {
    this.setState({ reviews });
  };

  clearArticle = () => {
    this.setArticle(nullArticle);
    this.setReviews([]);
  };

  addReview = (review) => {
    this.setReviews([...this.state.reviews, review]);
  };

  render() {
    const value = {
      article: this.state.article,
      reviews: this.state.reviews,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setArticle: this.setArticle,
      setReviews: this.setReviews,
      clearArticle: this.clearArticle,
      addReview: this.addReview,
    };
    return (
      <ArticleContext.Provider value={value}>
        {this.props.children}
      </ArticleContext.Provider>
    );
  }
}
